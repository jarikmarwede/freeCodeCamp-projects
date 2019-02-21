const cookieParser = require("cookie-parser");
const exphbs  = require('express-handlebars');
const express = require('express');
const server = require("./server");

// express configuration
const app = express();
const hbs = exphbs.create({
  defaultLayout: 'main'
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// middleware
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(async (request, response, next) => {
  const loggedIn = await server.isLoggedIn(request.cookies.session, request.cookies.username);
  request.middlewareData = {};
  request.middlewareData.loggedIn = loggedIn;
  hbs._renderTemplate = (template, context, options) => {
    context.loggedIn = loggedIn;
    return template(context, options);
  };
  next();
});

// routes
app.get("/", async (request, response) => {
  const polls = await server.getPolls();
  for (let index = 0; index < polls.length; index++) {
    polls[index].isHidden = index >= 10;
  }
  response.render("index", {polls: polls.reverse()});
});

app.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const sessionId = await server.getSessionId(username, password);

  if (sessionId) {
    const cookieSettings = {
      sameSite: "lax"
    };
    res.cookie("session", sessionId, cookieSettings);
    res.cookie("username", username, cookieSettings);
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
  if (req.middlewareData.loggedIn) {
    const creator = req.cookies.username;
    const polls = await server.getPolls({"creator": creator});

    for (let index = 0; index < polls.length; index++) {
      polls[index].isHidden = index >= 10;
    }
    res.render("dashboard", {polls: polls.reverse()});
  } else {
    res.redirect("/signup");
  }
});

app.get("/newpoll", async (req, res) => {
  if (req.middlewareData.loggedIn) {
    res.render("newpoll");
  } else {
    res.redirect("/signup");
  }
});

app.post("/newpoll", async (req, res) => {
  if (req.middlewareData.loggedIn) {
    const username = req.cookies.username;
    const pollName = req.body.pollname;
    let answers = [];
    for (let [key, value] of Object.entries(req.body)) {
      if (key.search(/^answer\d+$/) !== -1) {
        answers.push(value);
      }
    }

    const success = await server.createNewPoll(pollName, username, answers);
    if (success) {
      res.redirect("/poll/" + pollName);
    } else {
      res.redirect("back");
    }
  } else {
    res.redirect("/signup");
  }
});

app.get("/poll/:poll", async (req, res) => {
  const poll = await server.getPoll(req.params.poll);
  if (poll) {
    res.render("poll", {poll});
  } else {
    res.redirect("back");
  }
});

app.post("/poll/:poll", async (req, res) => {
  const pollName = req.params.poll;
  const answer = req.body.answer;
  await server.voteFor(pollName, answer);

  res.redirect("back");
});

app.get("/poll/:poll/changepoll", async (req, res) => {
  const pollName = req.params.poll;
  const username = req.cookies.username;
  const poll = await server.getPoll(pollName);
  const ownsPoll = username === poll.creator;

  if (req.middlewareData.loggedIn && ownsPoll) {
    res.render("changepoll", {poll});
  } else {
    res.redirect("back");
  }
});

app.post("/poll/:poll/changepoll", async (req, res) => {
  const pollName = req.params.poll;
  let answers = [];
  for (let [key, value] of Object.entries(req.body)) {
    if (key.search(/^answer\d+$/) !== -1) {
      answers.push(value);
    }
  }
  const username = req.cookies.username;
  const ownsPoll = await server.doesOwnPoll(username, pollName);

  if (req.middlewareData.loggedIn && ownsPoll) {
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
app.get("/api/getpoll/:poll", async (req, res) => {
  const pollName = req.params.poll;
  const poll = await server.getPoll(pollName);

  if (poll) {
    res.status(200).send(poll);
  } else {
    res.sendStatus(400);
  }
});

app.get("/api/deletepoll/:poll", async (req, res) => {
  const pollName = req.params.poll;
  const username = req.cookies.username;
  const ownsPoll = await server.doesOwnPoll(username, pollName);

  if (req.middlewareData.loggedIn && ownsPoll) {
    await server.deletePoll(pollName);
    res.sendStatus(200);
  } else {
    res.sendStatus(401);
  }
});

const listener = app.listen(process.env.PORT || 8080, () => {
  console.log("App listening on port " + listener.address().port);
});
