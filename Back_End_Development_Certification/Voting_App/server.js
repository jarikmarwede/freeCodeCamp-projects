const crypto = require("crypto");
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const DATABASE_PATH = process.env.DATABASE_PATH || "mongodb://localhost/voting-app";
const ALPHANUMERIC_REGEXP = /^[\w]+$/;
const USERNAME_REGEXP = ALPHANUMERIC_REGEXP;
const EMAIL_REGEXP = /^.+@.+\..+$/i;
const PASSWORD_REGEXP = /^.{8}.*$/i;
const SESSION_ID_REGEXP = /^[a-zA-z0-9]{128}$/;
const POLL_NAME_REGEXP = ALPHANUMERIC_REGEXP;
const ANSWER_REGEXP = ALPHANUMERIC_REGEXP;
const ONE_MEGABYTE = 1048576;
const KEY_LENGTH = 64;

async function checkForDatabaseLimit(db) {
  const stats = await db.stats({scale: ONE_MEGABYTE});
  if (stats["dataSize"] > 499) {
    const pollsCollection = db.collection("polls");
    const polls = await pollsCollection.find({}).toArray();
    if (polls.length > 0) {
      pollsCollection.remove({"_id": polls[0]["_id"]});
    }
  }
}

function generatePasswordHash(salt, password) {
  return crypto.scryptSync(password, salt, KEY_LENGTH).toString("hex");
}

function generateSalt() {
  crypto.randomBytes(KEY_LENGTH).toString("hex");
}

module.exports = {
  isLoggedIn: async function(sessionId, username) {
    if (!SESSION_ID_REGEXP.test(sessionId) || !USERNAME_REGEXP.test(username)) {
      return false;
    }

    const client = await MongoClient.connect(DATABASE_PATH);
    const db = client.db("voting-app");
    const collection = db.collection("user-data");
    const userData = await collection.find({"username": username}).toArray();

    client.close();
    return userData.length && userData[0]["session"] === sessionId;
  },
  passwordRight: async function(username, password) {
    if (!USERNAME_REGEXP.test(username) || !PASSWORD_REGEXP.test(password)) {
      return false;
    }

    const client = await MongoClient.connect(DATABASE_PATH);
    const db = client.db("voting-app");
    const userDataCollection = db.collection("user-data");
    const userData = await userDataCollection.findOne({"username": username});
    client.close();
    return userData && generatePasswordHash(userData.salt, password) === userData.hash;
  },
  doesOwnPoll: async function(username, pollName) {
    if (!USERNAME_REGEXP.test(username) || !POLL_NAME_REGEXP.test(pollName)) {
      return false;
    }

    const poll = await getPoll(pollName);
    return poll && poll["creator"] === username;
  },
  getSessionId: async function(username, password) {
    if (!USERNAME_REGEXP.test(username) || !PASSWORD_REGEXP.test(password)) {
      console.log("Invalid credentials");
      return null;
    }

    const client = await MongoClient.connect(DATABASE_PATH);
    const db = client.db("voting-app");
    const collection = db.collection("user-data");

    const userData = await collection.find({"username": username}).toArray();
    if (userData.length === 0) {
      console.log("Could not find user with username \"" + username + "\".");
      client.close();
      return null;
    }

    const hash = generatePasswordHash(userData[0]["salt"], password);
    if (userData[0]["hash"] !== hash) {
      console.log(`User "${username}" failed to log in.`);
      client.close();
      return null;
    }
    const sessionId = crypto.randomBytes(KEY_LENGTH).toString('hex');
    await collection.updateOne({"username": username}, {$set: {"session": sessionId}});
    client.close();
    return sessionId;
  },
  signup: async function(username, email, password) {
    if (!USERNAME_REGEXP.test(username) || !EMAIL_REGEXP.test(email) || !PASSWORD_REGEXP.test(password)) {
      console.log("Invalid credentials were entered during signup");
      return false;
    }

    const client = await MongoClient.connect(DATABASE_PATH);
    const db = client.db("voting-app");
    const userCollection = db.collection("user-data");
    const usernameSearch = await userCollection.find({"username": username}).toArray();
    const emailSearch = await userCollection.find({"email": email}).toArray();

    if (usernameSearch.length > 0 || emailSearch.length > 0) {
      console.log("Username or Email already exists!");
      client.close();
      return false;
    }

    const salt = generateSalt();
    const hash = generatePasswordHash(salt, password);
    userCollection.insertOne({"username": username, "email": email, "hash": hash, "salt": salt});
    client.close();
    return true;
  },
  createNewPoll: async function(pollName, username, answers) {
    if (!POLL_NAME_REGEXP.test(pollName) || answers.length < 2 || !USERNAME_REGEXP.test(username)) {
      console.log("Invalid arguments were entered when trying to create a new poll");
      return false;
    }
    for (let answer of answers) {
      if (!ANSWER_REGEXP.test(answer)) {
        console.log("Invalid answers were entered when trying to create a new poll");
        return false;
      }
    }

    const client = await MongoClient.connect(DATABASE_PATH);
    const db = client.db("voting-app");
    await checkForDatabaseLimit(db);
    const pollsCollection = db.collection("polls");
    const findPoll = await pollsCollection.find({"poll-name": pollName}).toArray();

    if (findPoll.length !== 0) {
      console.log(`"${username}" tried creating a poll with the name "${pollName}", but it already exists`);
      client.close();
      return false;
    }

    let answerJSON = {};
    for (let answer of answers) {
      answerJSON[answer] = 0;
    }
    pollsCollection.insertOne({"poll-name": pollName, "creator": username, "answers": answerJSON});
    client.close();
    return true;
  },
  getPoll: async function(pollName) {
    if (!POLL_NAME_REGEXP.test(pollName)) {
      console.log("Invalid arguments were entered when trying to retrieve poll information");
      return null;
    }

    const client = await MongoClient.connect(DATABASE_PATH);
    const db = client.db("voting-app");
    const pollsCollection = db.collection("polls");
    const pollSearch = await pollsCollection.find({"poll-name": pollName}).project({_id: 0}).toArray();

    client.close();
    if (pollSearch) {
      return pollSearch[0]
    } else {
      console.log("Could not find poll with name: " + pollName);
      return null;
    }
  },
  getPolls: async function(searchQuery={}) {
    const client = await MongoClient.connect(DATABASE_PATH);
    const db = client.db("voting-app");
    const pollsCollection = db.collection("polls");
    const polls = await pollsCollection.find(searchQuery).project({_id: 0}).toArray();

    client.close();
    if (!polls) {
      console.log("Could not find poll with search query: " + searchQuery);
    }
    return polls;
  },
  getUserData: async function(username) {
    if (!USERNAME_REGEXP.test(username)) {
      return {};
    }

    const client = await MongoClient.connect(DATABASE_PATH);
    const db = client.db("voting-app");
    const userCollection = db.collection("user-data");
    const userData = await userCollection.findOne({username: username}, {projection: {_id: 0, hash: 0, salt: 0, session: 0}});
    client.close();
    return userData;
  },
  updateUserData: async function(username, newUserData) {
    if (!USERNAME_REGEXP.test(username)) {
      return false;
    }

    const client = await MongoClient.connect(DATABASE_PATH);
    const db = client.db("voting-app");
    const userCollection = db.collection("user-data");
    const pollsCollection = db.collection("polls");
    const oldUserData = await getUserData(username);
    const usernameSearch = await userCollection.find({"username": newUserData.username}).toArray();
    const emailSearch = await userCollection.find({"email": newUserData.email}).toArray();

    for (let key of Object.keys(newUserData)) {
      if (key === "username") {
        if ((oldUserData.username !== newUserData.username && usernameSearch.length > 0) || !USERNAME_REGEXP.test(newUserData.username)) {
          return false;
        }
      } else if (key === "email") {
        if ((oldUserData.email !== oldUserData.email && emailSearch.length > 0) || !EMAIL_REGEXP.test(newUserData.email)) {
          return false;
        }
      } else {
        return false;
      }
    }

    const userUpdateResult = await userCollection.updateOne({username}, {$set: newUserData});
    let result = userUpdateResult.result.ok;
    if (newUserData.username) {
      const pollsUpdateResult = await pollsCollection.updateMany({creator: username}, {$set: {creator: newUserData.username}});
      result &= pollsUpdateResult.result.ok;
    }
    client.close();
    return result;
  },
  changePassword: async function(username, newPassword) {
    if (!USERNAME_REGEXP.test(username) || !PASSWORD_REGEXP.test(newPassword)) {
      return false;
    }

    const client = await MongoClient.connect(DATABASE_PATH);
    const db = client.db("voting-app");
    const userCollection = db.collection("user-data");
    const userData = await userCollection.findOne({username}, {projection: {salt: 1}});

    const updateResult = await userCollection.updateOne({username}, {$set: {hash: generatePasswordHash(userData.salt, newPassword)}});
    client.close();
    return updateResult.result.ok;
  },
  deletePoll: async function(pollName) {
    if (!POLL_NAME_REGEXP.test(pollName)) {
      return false;
    }

    const client = await MongoClient.connect(DATABASE_PATH);
    const db = client.db("voting-app");
    const pollsCollection = db.collection("polls");
    const deleteResult = await pollsCollection.deleteOne({"poll-name": pollName});
    client.close();
    return deleteResult.result.ok;
  },
  voteFor: async function(pollName, answer) {
    if (!POLL_NAME_REGEXP.test(pollName) || !ANSWER_REGEXP.test(answer)) {
      return false;
    }

    const client = await MongoClient.connect(DATABASE_PATH);
    const db = client.db("voting-app");
    const pollsCollection = db.collection("polls");
    const poll = await pollsCollection.find({"poll-name": pollName}).toArray();

    if (!poll[0].answers.hasOwnProperty(answer)) {
      client.close();
      return false;
    }

    const updateResult = await pollsCollection.updateOne({"poll-name": pollName}, {$inc: {[`answers.${answer}`]: 1}});
    client.close();
    return updateResult.result.ok;
  },
  changePollAnswers: async function(pollName, answers, username) {
    if (!POLL_NAME_REGEXP.test(pollName) || !answers || !USERNAME_REGEXP.test(username)) {
      return false;
    }
    for (let answer of answers) {
      if (!ANSWER_REGEXP.test(answer)) {
        console.log("Invalid answers");
        return false;
      }
    }

    const client = await MongoClient.connect(DATABASE_PATH);
    const db = client.db("voting-app");
    const pollCollection = db.collection("polls");
    const pollData = await pollCollection.find({"poll-name": pollName}).toArray();

    const oldPollAnswers = pollData[0]["answers"];
    const newPollAnswers = {};
    for (let key of answers) {
      if (oldPollAnswers.hasOwnProperty(key)) {
        newPollAnswers[key] = oldPollAnswers[key];
      } else {
        newPollAnswers[key] = 0;
      }
    }
    const updateResult = await pollCollection.updateOne({"poll-name": pollName}, {$set: {"answers": newPollAnswers}});
    client.close();
    return updateResult.result.ok;
  },
  deleteUser: async function(username) {
    if (!USERNAME_REGEXP.test(username)) {
      return false;
    }

    const client = await MongoClient.connect(DATABASE_PATH);
    const db = client.db("voting-app");
    const userCollection = db.collection("user-data");
    const pollsCollection = db.collection("polls");
    const userDeletionResult = await userCollection.deleteOne({username});
    const pollsDeletionResult = await pollsCollection.deleteMany({creator: username});
    client.close();
    return userDeletionResult.result.ok && pollsDeletionResult.result.ok;
  },
};
