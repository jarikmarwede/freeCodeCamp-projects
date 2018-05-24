var express = require('express');
var app = express();

app.use(express.static('public'));

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/:date", function(req, res) {
  if (isNaN(parseInt(req.params.date))) {
    var date = new Date(req.params.date);
  } else {
    var date = new Date(parseInt(req.params.date));
  }
  var dateJSON = {
      "unix": date.getTime(),
      "natural": date.toDateString()
  };
  if (dateJSON.natural == "Invalid Date") {
    res.status(400);
    res.send({"unix": null, "natural": null});
  } else {
    res.send(dateJSON);
  }
});

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
