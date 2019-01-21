const cookieParser = require("cookie-parser");
const express = require('express');
const exphbs  = require('express-handlebars');
const server = require("./server");
const handlebarsHelpers = require("./handlebarsHelpers");

// express configuration
const app = express();
const hbs = exphbs.create({
  defaultLayout: 'main',
  helpers: handlebarsHelpers
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// middleware
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.get("", async (request, response, next) => {
  const loggedIn = await server.isLoggedIn(request.cookies.sessionId, request.cookies.username)
  response.middlewareData = {};
  response.middlewareData.loggedIn = loggedIn;
  hbs._renderTemplate = (template, context, options) => {
    context.loggedIn = loggedIn;
    return template(context, options);
  };
  next();
});

// routes
app.get("/", async (request, response) => {
  const polls = await server.getPolls();
  response.render("index", {polls});
});

app.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const sessionId = await server.getSessionId(username, password);

  if (sessionId) {
    res.cookie("session", sessionId);
    res.cookie("username", username);
  }
  res.redirect("back");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.post("/signup", async (req, res) => {
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

app.get("/dashboard", async (req, res) => {
  const username = req.cookies.username;
  const sessionId = req.cookies.session;
  const loggedIn = await server.isLoggedIn(sessionId, username);

  if (loggedIn) {
    res.sendFile(__dirname + "/views/dashboard.html");
  } else {
    res.redirect("/signup");
  }
});

app.get("/newpoll", async (req, res) => {
  const username = req.cookies.username;
  const sessionId = req.cookies.session;
  const loggedIn = await server.isLoggedIn(sessionId, username);

  if (loggedIn) {
    res.sendFile(__dirname + "/views/newpoll.html");
  } else {
    res.redirect("/signup");
  }
});

app.post("/newpoll", async (req, res) => {
  const username = req.cookies.username;
  const sessionId = req.cookies.session;
  const pollName = req.body.pollname;
  let answers = [];
  for (let [key, value] of req.body) {
    if (key.search(/^answer\d+$/) !== -1) {
      answers.push(value);
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

app.get("/poll/:poll", (req, res) => {
  res.sendFile(__dirname + "/views/poll.html");
});

app.post("/poll/:poll", async (req, res) => {
  const pollName = req.params.poll;
  const answer = req.body.answer;
  await server.voteFor(pollName, answer);

  res.redirect("back");
});

app.get("/poll/:poll/changepoll", (req, res) => {
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

app.post("/poll/:poll/changepoll", async (req, res) => {
  const pollName = req.params.poll;
  let answers = [];
  for (let [key, value] of req.body) {
    if (key.search(/^answer\d+$/) !== -1) {
      answers.push(value);
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
app.get("/api/getpolls", async (req, res) => {
  const polls = await server.getPolls();

  res.send(polls);
});

app.get("/api/getpoll/:poll", async (req, res) => {
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

app.get("/api/getpollsof/:creator", async (req, res) => {
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

app.get("/api/deletepoll/:poll", async (req, res) => {
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

const listener = app.listen(process.env.PORT || 8080, () => {
  console.log('App listening on port ' + listener.address().port);
});