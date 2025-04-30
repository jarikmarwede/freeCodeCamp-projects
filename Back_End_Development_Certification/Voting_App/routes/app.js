const server = require("../server");
const express = require("express");
const router = express.Router();

router.get("/", async (request, response) => {
  const polls = await server.getPolls();
  for (let index = 0; index < polls.length; index++) {
    polls[index].isHidden = index >= 10;
  }
  response.render("index", {polls: polls.reverse()});
});

router.get("/signup", (request, response) => {
  response.render("signup");
});

router.get("/dashboard", async (request, response) => {
  if (request.middlewareData.loggedIn) {
    const creator = request.cookies.username;
    const polls = await server.getPolls({"creator": creator});

    for (let index = 0; index < polls.length; index++) {
      polls[index].isHidden = index >= 10;
    }
    response.render("dashboard", {polls: polls.reverse()});
  } else {
    response.redirect("/signup");
  }
});

router.get("/account", async (request, response) => {
  if (request.middlewareData.loggedIn) {
    const username = request.cookies.username;
    const userData = await server.getUserData(username);
    response.render("account", {username, email: userData.email});
  } else {
    response.redirect("/signup");
  }
});

router.get("/newpoll", async (request, response) => {
  if (request.middlewareData.loggedIn) {
    response.render("newpoll");
  } else {
    response.redirect("/signup");
  }
});

router.get("/poll/:poll", async (request, response) => {
  const poll = await server.getPoll(request.params.poll);
  if (poll) {
    response.render("poll", {poll});
  } else {
    response.redirect(request.get("Referrer") || "/");
  }
});

router.get("/poll/:poll/changepoll", async (request, response) => {
  const pollName = request.params.poll;
  const username = request.cookies.username;
  const poll = await server.getPoll(pollName);
  const ownsPoll = username === poll.creator;

  if (request.middlewareData.loggedIn && ownsPoll) {
    response.render("changepoll", {poll});
  } else {
    response.redirect(request.get("Referrer") || "/");
  }
});

module.exports = router;
