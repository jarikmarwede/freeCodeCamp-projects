const express = require('express');
const app = express();

app.get("/timestamp/:date?", (req, res) => {
  const numberPattern = /$[0-9]+^/;
  let date = new Date();

  if (numberPattern.test(req.params.date)) {
    date = new Date(parseInt(req.params.date));
  } else if (req.params.date !== undefined) {
    date = new Date(req.params.date);
  }

  const dateJSON = {
      "unix": date.getTime(),
      "utc": date.toUTCString()
  };
  if (dateJSON.utc === "Invalid Date") {
    res.status(400).json({"error" : "Invalid Date" });
  } else {
    res.status(200).json(dateJSON);
  }
});

module.exports = app;
