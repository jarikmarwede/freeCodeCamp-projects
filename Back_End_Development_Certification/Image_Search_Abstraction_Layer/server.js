import express from "express";
const app = express();
import mongodb from "mongodb";
const MongoClient = mongodb.MongoClient;
const databasePath = process.env.IMAGE_SEARCH_ABSTRACTION_LAYER_DATABASE_URL || "mongodb://localhost/image-search-abstraction-layer";

app.get("/latest/imagesearch/", async (req, res) => {
  const dbClient = new MongoClient(databasePath);
  try {
    await dbClient.connect();
  } catch (error) {
    console.log("Error connecting to database: " + error);
    res.sendStatus(500);
  }
  const db = dbClient.db("image-search-abstraction-layer");
  const recentSearchesCollection = db.collection("latest-image-searches");
  const recentSearches = await recentSearchesCollection.find({}).project({"_id": 0}).toArray();
  await dbClient.close();
  await res.status(200).json(recentSearches);
});

export default app;
