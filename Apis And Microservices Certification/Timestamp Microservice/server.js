const express = require('express');
const app = express();

app.get("/api/timestamp/:date?", (req, res) => {
  const numberPattern = /$[0-9]+^/;

  if (req.params.date === undefined) {
    var date = new Date();
  } else if (!numberPattern.test(req.params.date)) {
    var date = new Date(req.params.date);
  } else {
    var date = new Date(parseInt(req.params.date));
  }

  const dateJSON = {
      "unix": date.getTime(),
      "utc": date.toUTCString()
  };
  if (dateJSON.utc == "Invalid Date") {
    res.status(400);
    res.send({"error" : "Invalid Date" });
  } else {
    res.send(dateJSON);
  }
});

module.exports = app;
