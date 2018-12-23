const multer = require("multer");
const upload = multer({ dest: 'uploads/' })
const express = require('express');
const app = express();

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

module.exports = app;
