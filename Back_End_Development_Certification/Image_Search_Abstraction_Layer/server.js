import express from "express";
const app = express();
import mongodb from "mongodb";
import fetch from "node-fetch";
const MongoClient = mongodb.MongoClient;
const databasePath = process.env.IMAGE_SEARCH_ABSTRACTION_LAYER_DATABASE_URL || "mongodb://localhost/image-search-abstraction-layer";

app.get("/imagesearch/*?", async (req, res) => {
  const searchString = req.params[0];
  const offset = req.query.offset || 1;
  const APICallString = "https://contextualwebsearch-websearch-v1.p.mashape.com/api/Search/ImageSearchAPI?count=" + offset * 10 + "&q=" + searchString + "&autocorrect=false";
  const apiPromise = fetch(APICallString, {
    headers: {
      "X-RapidAPI-Key": process.env.RAPID_API_KEY
    }
  });

  const dbClient = new MongoClient(databasePath);
  try {
    await dbClient.connect();
  } catch (error) {
    console.log("Error connecting to database: " + error);
    res.sendStatus(500);
  }
  const db = dbClient.db("image-search-abstraction-layer");
  const recentSearchesCollection = db.collection("latest-image-searches");
  const date = new Date();
  recentSearchesCollection.insert({"term": searchString, "when": date.toISOString()});

  let recentSearches = await recentSearchesCollection.find({}).toArray();
  if (recentSearches.length > 10) {
    recentSearches = recentSearches.slice(1, 11);
    recentSearchesCollection.remove();
    recentSearchesCollection.insert(recentSearches);
  }
  dbClient.close().then();
  const apiResponse = await apiPromise;
  const responseData = await apiResponse.json();
  const images = responseData.value.slice(offset * 10 - 10, offset * 10);
  await res.status(200).json(images);
});

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
