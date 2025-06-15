const server = require("../server");
const express = require("express");
const router = express.Router();

// XSRF check
router.use((request, response, next) => {
  const formValid = request.body?.xsrfFormValue && request.body.xsrfFormValue === request.cookies.xsrfFormValue;
  if (formValid || request.method === "GET" || request.method === "HEAD") {
    next();
  } else {
    console.log("XSRF check false");
    response.sendStatus(401);
  }
});

router.get("/poll/:poll", async (request, response) => {
  const pollName = request.params.poll;
  const poll = await server.getPoll(pollName);

  if (poll) {
    response.status(200).send(poll);
  } else {
    response.sendStatus(400);
  }
});

router.post("/signup", async (request, response) => {
  const username = request.body.username;
  const email = request.body.email;
  const password = request.body.password;

  const success = await server.signup(username, email, password);

  if (success) {
    response.redirect("/");
  } else {
    response.redirect(request.get("Referrer") || "/");
  }
});

router.post("/login", async (request, response) => {
  const username = request.body.username;
  const password = request.body.password;
  const sessionId = await server.getSessionId(username, password);

  if (sessionId) {
    const cookieSettings = {
      sameSite: "lax",
      secure: true,
    };
    response.cookie("session", sessionId, cookieSettings);
    response.cookie("username", username, cookieSettings);
  }
  response.redirect(request.get("Referrer") || "/");
});

router.post("/newpoll", async (request, response) => {
  if (request.middlewareData.loggedIn) {
    const username = request.cookies.username;
    const pollName = request.body.pollname;
    let answers = [];
    for (let [key, value] of Object.entries(request.body)) {
      if (key.search(/^answer\d+$/) !== -1) {
        answers.push(value);
      }
    }

    const success = await server.createNewPoll(pollName, username, answers);
    if (success) {
      response.status(201).redirect("/poll/" + pollName);
    } else {
      response.status(500).redirect(request.get("Referrer") || "/");
    }
  } else {
    response.status(401).redirect("/signup");
  }
});

router.post("/poll/:poll/vote", async (request, response) => {
  const pollName = request.params.poll;
  const answer = request.body.answer;
  await server.voteFor(pollName, answer);

  response.redirect(request.get("Referrer") || "/");
});

router.post("/poll/:poll/changepoll", async (request, response) => {
  const pollName = request.params.poll;
  let answers = [];
  for (let [key, value] of Object.entries(request.body)) {
    if (key.search(/^answer\d+$/) !== -1) {
      answers.push(value);
    }
  }
  const username = request.cookies.username;
  const ownsPoll = await server.doesOwnPoll(username, pollName);

  if (request.middlewareData.loggedIn && ownsPoll) {
    const success = await server.changePollAnswers(pollName, answers, username);

    if (success) {
      response.redirect("/poll/" + pollName);
    } else {
      response.redirect(request.get("Referrer") || "/");
    }
  } else {
    response.redirect(request.get("Referrer") || "/");
  }
});

router.delete("/poll/:poll", async (request, response) => {
  const pollName = request.params.poll;
  const username = request.cookies.username;
  const ownsPoll = await server.doesOwnPoll(username, pollName);

  if (request.middlewareData.loggedIn && ownsPoll) {
    const success = await server.deletePoll(pollName);
    if (success) {
      response.sendStatus(200);
    } else {
      response.sendStatus(500);
    }
  } else {
    response.sendStatus(401);
  }
});

router.post("/user/:username", async (request, response) => {
  if (request.middlewareData.loggedIn && request.params.username === request.cookies.username) {
    const success = await server.updateUserData(request.params.username, {username: request.body.username, email: request.body.email});
    if (success) {
      response.cookie("username", request.body.username);
      response.status(200).redirect(request.get("Referrer") || "/");
    } else {
      response.status(500).redirect(request.get("Referrer") || "/");
    }
  } else {
    response.sendStatus(401);
  }
});

router.post("/user/:username/change_password", async (request, response) => {
  if (request.middlewareData.loggedIn && request.params.username === request.cookies.username) {
    if (request.body["new-password"] === request.body["new-password2"] && (await server.passwordRight(request.params.username, request.body["old-password"]))) {
      const success = await server.changePassword(request.params.username, request.body["new-password"]);
      if (success) {
        response.status(200).redirect(request.get("Referrer") || "/");
      } else {
        response.status(500).redirect(request.get("Referrer") || "/");
      }
    } else {
      response.sendStatus(400);
    }
  } else {
    response.sendStatus(401);
  }
});

router.delete("/user/:username", async (request, response) => {
  if (request.middlewareData.loggedIn && request.params.username === request.cookies.username) {
    const success = await server.deleteUser(request.params.username);
    if (success) {
      response.sendStatus(200);
    } else {
      response.sendStatus(500);
    }
  } else {
    response.sendStatus(401);
  }
});

module.exports = router;
