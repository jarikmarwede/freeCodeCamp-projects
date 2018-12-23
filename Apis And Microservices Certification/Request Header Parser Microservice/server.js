const express = require('express');
const app = express();

app.get("/api/whoami", (req, res) => {
  const responseJSON = {
    "ipaddress": req.get("x-forwarded-for").split(",")[0],
    "language": req.get("accept-language").split(",")[0],
    "software": req.get("user-agent").split("(")[1].split(")")[0]
  }
  res.send(responseJSON);
});

module.exports = app;
