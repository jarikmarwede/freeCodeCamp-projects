import fs from "fs";
import multer from "multer";
const upload = multer({ dest: "uploads/" });
import express from "express";
const app = express();

app.post("/upload", upload.single("upfile"), (req, res) => {
  if (req.file) {
    res.status(200).json({
      filename: req.file.originalname,
      size: req.file.size
    });
    fs.unlink(req.file.destination + "/" + req.file.filename, err => {
      if (err) console.log(err);
    });
  } else {
    res.status(400).json({"error": "No file uploaded"});
  }
});

export default app;
