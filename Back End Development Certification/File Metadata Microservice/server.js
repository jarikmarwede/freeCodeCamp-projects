var multer = require("multer");
var upload = multer({ dest: 'uploads/' })
var express = require('express');
var app = express();

app.use(express.static('public'));

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/index.html');
});

app.post("/upload", upload.single("file"), function(req, res, next) {
  console.log(req.file.size);
  res.send({"size": req.file.size});
});

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
