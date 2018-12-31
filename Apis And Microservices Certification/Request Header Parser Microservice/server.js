const express = require('express');
const app = express();

app.get("/whoami", (req, res) => {
  const xForwardedFor = req.get("x-forwarded-for");
  const acceptLanguage = req.get("accept-language");
  const userAgent = req.get("user-agent");
  const responseJSON = {};
  if (xForwardedFor) {
    responseJSON.ipaddress = xForwardedFor.split(",")[0];
  }
  if (acceptLanguage) {
    responseJSON.language = acceptLanguage.split(",")[0];
  }
  if (userAgent) {
    responseJSON.software = userAgent.split("(")[1].split(")")[0];
  }
  res.status(200).json(responseJSON);
});

module.exports = app;
