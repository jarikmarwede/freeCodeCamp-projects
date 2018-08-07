const cookieParser = require("cookie-parser");
const express = require('express');
const app = express();
const server = require("./server");

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

// routes
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.post("/login", async function(req, res) {
  const username = req.body.username;
  const password = req.body.password;
  const sessionId = await server.getSessionId(username, password);

  if (sessionId) {
    res.cookie("session", sessionId);
    res.cookie("username", username);
    res.redirect("back");
  } else {
    res.redirect("back");
  }
});

app.get("/signup", function(req, res) {
  res.sendFile(__dirname + "/views/signup.html");
});

app.post("/signup", async function(req, res) {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const success = await server.signup(username, email, password);

  if (success) {
    res.redirect("/");
  } else {
    res.redirect("back");
  }
});

app.get("/dashboard", async function(req, res) {
  const username = req.cookies.username;
  const sessionId = req.cookies.session;
  const loggedIn = await server.isLoggedIn(sessionId, username);

  if (loggedIn) {
    res.sendFile(__dirname + "/views/dashboard.html");
  } else {
    res.redirect("/signup");
  }
});

app.get("/newpoll", async function(req, res) {
  const username = req.cookies.username;
  const sessionId = req.cookies.session;
  const loggedIn = await server.isLoggedIn(sessionId, username);

  if (loggedIn) {
    res.sendFile(__dirname + "/views/newpoll.html");
  } else {
    res.redirect("/signup");
  }
});

app.post("/newpoll", async function(req, res) {
  const username = req.cookies.username;
  const sessionId = req.cookies.session;
  const pollName = req.body.pollname;
  let answers = []
  for (let key in req.body) {
    if (key.search(/^answer\d+$/) != -1) {
      answers.push(req.body[key]);
    }
  }
  const loggedIn = await server.isLoggedIn(sessionId, username);

  if (loggedIn) {
    const success = await server.createNewPoll(pollName, answers, username);
    if (success) {
      res.redirect("/poll/" + pollName);
    } else {
      res.redirect("back");
    }
  } else {
    res.redirect("/signup");
  }
});

app.get("/poll/:poll", function(req, res) {
  res.sendFile(__dirname + "/views/poll.html");
});

app.post("/poll/:poll", async function(req, res) {
  const pollName = req.params.poll;
  const answer = req.body.answer;
  await server.voteFor(pollName, answer);

  res.redirect("back");
});

app.get("/poll/:poll/changepoll", function(req, res) {
  const pollName = req.params.poll;
  const username = req.cookies.username;
  const sessionId = req.cookies.session;
  const loggedIn = server.isLoggedIn(sessionId, username);
  const ownsPoll = server.doesOwnPoll(username, pollName);

  if (loggedIn && ownsPoll) {
    res.sendFile(__dirname + "/views/changepoll.html");
  } else {
    res.redirect("back");
  }
});

app.post("/poll/:poll/changepoll", async function(req, res) {
  const pollName = req.params.poll;
  let answers = []
  for (let key in req.body) {
    if (key.search(/^answer\d+$/) != -1) {
      answers.push(req.body[key]);
    }
  }
  const username = req.cookies.username;
  const sessionId = req.cookies.session;
  const loggedIn = server.isLoggedIn(sessionId, username);
  const ownsPoll = server.doesOwnPoll(username, pollName);

  if (loggedIn && ownsPoll) {
    const success = await server.changePollAnswers(pollName, answers, username);

    if (success) {
      res.redirect("/poll/" + pollName);
    } else {
      res.redirect("back");
    }
  } else {
    res.redirect("back");
  }
});

// API
app.get("/api/getpolls", async function(req, res) {
  const polls = await server.getPolls();

  res.send(polls);
});

app.get("/api/getpoll/:poll", async function(req, res) {
  const pollName = req.params.poll;
  const poll = await server.getPoll(pollName);

  if (poll) {
    res.status(200);
    res.send(poll);
  } else {
    res.status(400);
    res.end();
  }
});

app.get("/api/getpollsof/:creator", async function(req, res) {
  const username = req.cookies.username;
  const sessionId = req.cookies.session;
  const creator = req.params.creator;
  const loggedIn = await server.isLoggedIn(sessionId, username);

  if (loggedIn) {
    const polls = await server.getPolls({"creator": creator});
    res.send(polls);
  } else {
    res.status(401);
    res.end();
  }
});

app.get("/api/deletepoll/:poll", async function(req, res) {
  const pollName = req.params.poll;
  const sessionId = req.cookies.session;
  const username = req.cookies.username;
  const loggedIn = await server.isLoggedIn(sessionId, username);
  const ownsPoll = await server.doesOwnPoll(username, pollName);

  if (loggedIn && ownsPoll) {
    await server.deletePoll(pollName);
    res.status(200);
    res.send({});
  } else {
    res.status(401);
    res.send({});
  }
});

const listener = app.listen(process.env.PORT, function () {
  console.log('App listening on port ' + listener.address().port);
});
