const express = require("express");
app = express();
const cors = require("cors");

const exerciseTracker = require("./Apis And Microservices Certification/Exercise Tracker/server.js");
const fileMetadataMicroservice = require("./Apis And Microservices Certification/File Metadata Microservice/server.js");
const requestHeaderParserMicroservice = require("./Apis And Microservices Certification/Request Header Parser Microservice/server.js");
const timestampMicroservice = require("./Apis And Microservices Certification/Timestamp Microservice/server.js");
const urlShortenerMicroservice = require("./Apis And Microservices Certification/URL Shortener Microservice/server.js");
const imageSearchAbstractionLayer = require("./Back End Development Certification/Image Search Abstraction Layer/server.js");

const corsOptions = {
  origin: "https://jarikmarwede.github.io"
};
if (process.env.NODE_ENV === "development") {
  console.log("Starting in development mode");
  corsOptions.origin = "*";
}

app.use(cors(corsOptions));

app.use("/exercise-tracker", exerciseTracker);
app.use("/file-metadata-microservice", fileMetadataMicroservice);
app.use("/request-header-parser-microservice", requestHeaderParserMicroservice);
app.use("/timestamp-microservice", timestampMicroservice);
app.use("/url-shortener-microservice", urlShortenerMicroservice);
app.use("/image-search-abstraction-layer", imageSearchAbstractionLayer);

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('The app is listening on port ' + listener.address().port)
});
