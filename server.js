import express from "express";
const app = express();
import cors from "cors";

import exerciseTracker from "./Back_End_Development_and_APIs_Certification/Exercise_Tracker/server.js";
import fileMetadataMicroservice from "./Back_End_Development_and_APIs_Certification/File_Metadata_Microservice/server.js";
import requestHeaderParserMicroservice from "./Back_End_Development_and_APIs_Certification/Request_Header_Parser_Microservice/server.js";
import timestampMicroservice from "./Back_End_Development_and_APIs_Certification/Timestamp_Microservice/server.js";
import urlShortenerMicroservice from "./Back_End_Development_and_APIs_Certification/URL_Shortener_Microservice/server.js";
import imageSearchAbstractionLayer from "./Back_End_Development_Certification/Image_Search_Abstraction_Layer/server.js";

const corsOptions = {
  origin: "https://freecodecamp.jarikmarwede.com"
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
