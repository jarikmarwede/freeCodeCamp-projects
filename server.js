const express = require("express");
app = express();
const cors = require("cors");

const exerciseTracker = require("./Apis_And_Microservices_Certification/Exercise_Tracker/server.js");
const fileMetadataMicroservice = require("./Apis_And_Microservices_Certification/File_Metadata_Microservice/server.js");
const requestHeaderParserMicroservice = require("./Apis_And_Microservices_Certification/Request_Header_Parser_Microservice/server.js");
const timestampMicroservice = require("./Apis_And_Microservices_Certification/Timestamp_Microservice/server.js");
const urlShortenerMicroservice = require("./Apis_And_Microservices_Certification/URL_Shortener_Microservice/server.js");
const imageSearchAbstractionLayer = require("./Back_End_Development_Certification/Image_Search_Abstraction_Layer/server.js");

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
