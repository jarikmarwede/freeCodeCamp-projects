const crypto = require("crypto");
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const DATABASE_PATH = process.env.DATABASE_PATH || "mongodb://localhost/voting-app";
const ALPHANUMERIC_REGEXP = /^[\w]*$/;
const USERNAME_REGEXP = ALPHANUMERIC_REGEXP;
const EMAIL_REGEXP = /^.+@.+\..+$/i;
const PASSWORD_REGEXP = /^.{8}.*$/i;
const POLL_NAME_REGEXP = ALPHANUMERIC_REGEXP;
const ANSWER_REGEXP = ALPHANUMERIC_REGEXP;
const ONE_MEGABYTE = 1048576;

async function checkForDatabaseLimit(db) {
  const stats = await db.runCommand({ dbStats: 1, scale: ONE_MEGABYTE });
  if (stats.dataSize > 499) {
    const pollsCollection = db.collection("polls");
    const polls = await pollsCollection.find({}).toArray();
    if (polls.length > 0) {
      pollsCollection.remove({"_id": polls[0]["_id"]});
    }
  }
}

async function isLoggedIn(sessionId, username) {
  if (sessionId && username) {
    const client = await MongoClient.connect(DATABASE_PATH);
    const db = client.db("voting-app");
    const collection = db.collection("user-data");
    const userData = await collection.find({"username": username}).toArray();

    if (userData.length && userData[0]["session"] === sessionId) {
      client.close();
      return true;
    } else {
      client.close();
      return false;
    }
  } else {
    return false;
  }
}

async function doesOwnPoll(username, pollName) {
  const poll = await getPoll(pollName);

  return !!(poll && poll["creator"] === username);
}

async function getSessionId(username, password) {
  if (username && PASSWORD_REGEXP.test(password)) {
    const client = await MongoClient.connect(DATABASE_PATH);
    const db = client.db("voting-app");
    const collection = db.collection("user-data");

    const userData = await collection.find({"username": username}).toArray();
    if (userData.length === 0) {
      console.log("Could not find user with username \"" + username + "\".");
      client.close();
      return null;
    } else {
      const hash = crypto.createHash("sha256");
      hash.update(password);
      if (userData[0]["password"] !== hash.digest("hex")) {
        console.log("Wrong password");
        client.close();
        return null;
      }
      const sessionId = crypto.randomBytes(20).toString('hex');
      await collection.updateOne({"username": username}, {$set: {"session": sessionId}});
      client.close();
      return sessionId;
    }
  } else {
    console.log("Invalid credentials");
    return null;
  }
}

async function signup(username, email, password) {
  if (USERNAME_REGEXP.test(username) && EMAIL_REGEXP.test(email) && PASSWORD_REGEXP.test(password)) {
    const client = await MongoClient.connect(DATABASE_PATH);
    const db = client.db("voting-app");
    const userCollection = db.collection("user-data");
    const usernameSearch = await userCollection.find({"username": username}).toArray();
    const emailSearch = await userCollection.find({"email": email}).toArray();

    if (usernameSearch.length > 0 || emailSearch.length > 0) {
      console.log(usernameSearch);
      console.log("Username or Email already exists!");
      client.close();
      return false;
    } else {
      const hash = crypto.createHash('sha256');
      hash.update(password);
      userCollection.insert({"username": username, "email": email, "password": hash.digest("hex")});
      client.close();
      return true;
    }
  } else {
    console.log("Invalid credentials");
    return false;
  }
}

async function createNewPoll(pollName, answers, username) {
  if (POLL_NAME_REGEXP.test(pollName) && answers.length >= 2 && username) {
    for (let answer of answers) {
      if (!ANSWER_REGEXP.test(answer)) {
        console.log("Invalid answers");
        return false;
      }
    }
    const client = await MongoClient.connect(DATABASE_PATH);
    const db = client.db("voting-app");
    await checkForDatabaseLimit();
    const pollsCollection = db.collection("polls");
    const findPoll = await pollsCollection.find({"poll-name": pollName}).toArray();

    if (findPoll.length === 0) {
      let answerJSON = {};
      for (let answer of answers) {
        answerJSON[answer] = 0;
      }
      pollsCollection.insert({"poll-name": pollName, "creator": username, "answers": answerJSON});
      client.close();
      return true;
    } else {
      console.log("A poll with the name \"" + pollName + "\" already exists");
      client.close();
      return false;
    }
  } else {
    console.log("Invalid arguments");
    return false;
  }
}

async function getPoll(pollName) {
  if (pollName) {
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
  } else {
    console.log("No poll name passed to API!");
    return null;
  }
}

async function getPolls(searchQuery={}) {
  const client = await MongoClient.connect(DATABASE_PATH);
  const db = client.db("voting-app");
  const pollsCollection = db.collection("polls");
  const polls = await pollsCollection.find(searchQuery).project({_id: 0}).toArray();

  client.close();
  if (polls) {
    return polls
  } else {
    console.log("Could not find poll with search query: " + searchQuery);
    return null;
  }
}

async function deletePoll(pollName) {
  if (pollName) {
    const client = await MongoClient.connect(DATABASE_PATH);
    const db = client.db("voting-app");
    const pollsCollection = db.collection("polls");
    pollsCollection.remove({"poll-name": pollName});
    client.close();
  }
}

async function voteFor(pollName, answer) {
  if (pollName && answer) {
    const client = await MongoClient.connect(DATABASE_PATH);
    const db = client.db("voting-app");
    const pollsCollection = db.collection("polls");
    const poll = await pollsCollection.find({"poll-name": pollName}).toArray();

    if (poll[0].answers.hasOwnProperty(answer)) {
      pollsCollection.updateOne({"poll-name": pollName}, {$inc: {[`answers.${answer}`]: 1}});
    }
    client.close();
  }
}

async function changePollAnswers(pollName, answers, username) {
  if (pollName && answers && username) {
    for (let answer of answers) {
      if (ANSWER_REGEXP.test(answer) === false) {
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
    pollCollection.updateOne({"poll-name": pollName}, {$set: {"answers": newPollAnswers}});
    client.close();
    return true;
  } else {
    return false;
  }
}

module.exports.isLoggedIn = isLoggedIn;
module.exports.doesOwnPoll = doesOwnPoll;
module.exports.getSessionId = getSessionId;
module.exports.signup = signup;
module.exports.createNewPoll = createNewPoll;
module.exports.getPoll = getPoll;
module.exports.getPolls = getPolls;
module.exports.deletePoll = deletePoll;
module.exports.voteFor = voteFor;
module.exports.changePollAnswers = changePollAnswers;
