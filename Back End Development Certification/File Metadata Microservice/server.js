const multer = require("multer");
const upload = multer({ dest: 'uploads/' })
const express = require('express');
const app = express();

app.use(express.static('public'));

app.get("/", (request, response) => {
  response.sendFile(__dirname + '/views/index.html');
});

app.post("/upload", upload.single("upfile"), (req, res, next) => {
  if (req.file) {
    res.send({
      "filename": req.file.originalname,
      "size": req.file.size
    });
  } else {
    res.send({});
  }
});

const listener = app.listen(process.env.PORT, () => {
  console.log('The app is listening on port ' + listener.address().port);
});
