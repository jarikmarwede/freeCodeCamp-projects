var express = require('express');
var app = express();

app.use(express.static('public'));

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/api/whoami", function (req, res) {
  var responseJSON = {
    "ipaddress": req.get("x-forwarded-for").split(",")[0],
    "language": req.get("accept-language").split(",")[0],
    "software": req.get("user-agent").split("(")[1].split(")")[0]
  }
  res.send(responseJSON);
});

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
