import express from "express";
const app = express();
import bodyParser from "body-parser";
import User from "./user.js";

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/exercise/users", (req, res) => {
  User.find({}, "username _id", (err, users) => {
    if (err) return res.status(500).json("Could not find any user");
    res.status(200).send(users);
  });
});

app.post("/exercise/add", (req, res) => {
  User.findOne({_id: req.body.userId}, "_id username exercises", (err, user) => {
    if (err) return res.status(500).json({"error": "Could not find user"});
    if (user) {
      user.exercises.push({description: req.body.description, duration: req.body.duration, date: req.body.date ? req.body.date : new Date().toISOString()});
      user.save((err, user) => {
        if (err) return res.sendStatus(500);
        res.status(200).send(user);
      });
    } else {
      return res.sendStatus(404);
    }
  });
});

app.get("/exercise/log", (req, res) => {
  User.findById(req.query.userId, "_id username exercises", (err, user) => {
    if (err) return res.status(500).json({"error": "Could not find user"});
    if (user) {
      user.count = user.exercises.length;
      if (req.query.to) {
        user.exercises = user.exercises.filter(exercise => new Date(exercise.date).getTime() <= new Date(req.query.to).getTime());
      }
      if (req.query.from) {
        user.exercises = user.exercises.filter(exercise => new Date(exercise.date).getTime() >= new Date(req.query.from).getTime());
      }
      if (req.query.limit) {
        user.exercises = user.exercises.slice(0, req.query.limit);
      }
      res.status(200).json(user);
    }
  });
});

// Not found middleware
app.use((req, res, next) => {
  return next({status: 404, message: "not found"})
});

// Error Handling middleware
app.use((err, req, res) => {
  let errCode, errMessage;

  if (err.errors) {
    // mongoose validation error
    errCode = 400; // bad request
    const keys = Object.keys(err.errors);
    // report the first validation error
    errMessage = err.errors[keys[0]].message
  } else {
    // generic or custom error
    errCode = err.status || 500;
    errMessage = err.message || "Internal Server Error"
  }
  res.status(errCode).type("txt")
    .send(errMessage)
});

export default app;
