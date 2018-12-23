const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const userSchema = new Schema({
  username: String,
  exercises: [{
    description: String,
    duration: Number,
    date: { type: Date, default: Date.now }
  }]
}, {usePushEach: true});
const User = mongoose.model("User", userSchema);
mongoose.connect(process.env.MLAB_URI || 'mongodb://localhost/exercise-track' )

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.post("/api/exercise/new-user", (req, res) => {
  const user = new User({username: req.body.username});
  user.save((err, user) => {
    if (err) return res.sendStatus(500);
    res.status(201).send({username: user.username, _id: user._id});
  });
});

app.get("/api/exercise/users", (req, res) => {
  User.find({}, "username _id", (err, users) => {
    if (err) return res.sendStatus(500);
    res.status(200).send(users);
  });
});

app.post("/api/exercise/add", (req, res) => {
  User.findOne({_id: req.body.userId}, "_id username exercises", (err, user) => {
    if (err) return res.sendStatus(500);
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

app.get("/api/exercise/log", (req, res) => {
  User.findById(req.query.userId, "_id username exercises", (err, user) => {
    if (err) return res.sendStatus(500);
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
  return next({status: 404, message: 'not found'})
})

// Error Handling middleware
app.use((err, req, res, next) => {
  let errCode, errMessage

  if (err.errors) {
    // mongoose validation error
    errCode = 400 // bad request
    const keys = Object.keys(err.errors)
    // report the first validation error
    errMessage = err.errors[keys[0]].message
  } else {
    // generic or custom error
    errCode = err.status || 500
    errMessage = err.message || 'Internal Server Error'
  }
  res.status(errCode).type('txt')
    .send(errMessage)
})

module.exports = app;
