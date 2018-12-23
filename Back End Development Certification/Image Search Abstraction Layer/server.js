const unirest = require("unirest");
const express = require('express');
const app = express();
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const databasePath = process.env.DATABASE_PATH;
const RapidAPI = new require('rapidapi-connect');
const rapid = new RapidAPI(process.env.RAPID_API, '/connect/auth/' + process.env.RAPID_API);

app.get("/api/imagesearch/*?", (req, res) => {
  const searchString = req.params[0];
  const offset = req.query.offset;
  if (offset == undefined) {offset = 1};
  const APICallString = "https://contextualwebsearch-websearch-v1.p.mashape.com/api/Search/ImageSearchAPI?count=" + offset * 10 + "&q=" + searchString + "&autocorrect=false";
  unirest.get(APICallString).header("X-Mashape-Key", process.env.X_MASHAPE_KEY).header("X-Mashape-Host", "contextualwebsearch-websearch-v1.p.mashape.com").end(function (result) {
    const images = result.body.value.slice(offset * 10 - 10, offset * 10);
    res.send(images);
  });
  MongoClient.connect(databasePath, async (err, client) => {
    if (err) {
      console.log("Error connecting to database: " + err);
    } else {
      const db = client.db("image-search-abstraction-layer");
      const recentSearchesCollection = db.collection("latest-image-searches");
      const date = new Date();
      recentSearchesCollection.insert({"term": searchString, "when": date.toISOString()});

      let recentSearches = await recentSearchesCollection.find({}).toArray();
      if (recentSearches.length > 10) {
        recentSearches = recentSearches.slice(1, 11);
        recentSearchesCollection.remove();
        recentSearchesCollection.insert(recentSearches);
      }
    }
    client.close();
  });
});

app.get("/api/latest/imagesearch/", (req, res) => {
  MongoClient.connect(databasePath, async function(err, client) {
    if (err) {
      console.log("Error connecting to database: " + err);
    } else {
      const db = client.db("image-search-abstraction-layer");
      const recentSearchesCollection = db.collection("latest-image-searches");
      const recentSearches = await recentSearchesCollection.find({}).project({"_id": 0}).toArray();

      client.close();
      res.send(recentSearches);
    }
  });
});

module.exports = app;
