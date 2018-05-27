var unirest = require("unirest");
var express = require('express');
var app = express();
var mongodb = require("mongodb");
var MongoClient = mongodb.MongoClient;
var databasePath = process.env.DATABASE_PATH;
const RapidAPI = new require('rapidapi-connect');
const rapid = new RapidAPI(process.env.RAPID_API, '/connect/auth/' + process.env.RAPID_API);

app.use(express.static('public'));

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/api/imagesearch/*?", function(req, res) {
  var searchString = req.params[0];
  var offset = req.query.offset;
  if (offset == undefined) {offset = 1};
  var APICallString = "https://contextualwebsearch-websearch-v1.p.mashape.com/api/Search/ImageSearchAPI?count=" + offset * 10 + "&q=" + searchString + "&autocorrect=false";
  unirest.get(APICallString).header("X-Mashape-Key", process.env.X_MASHAPE_KEY).header("X-Mashape-Host", "contextualwebsearch-websearch-v1.p.mashape.com").end(function (result) {
    var images = result.body.value.slice(offset * 10 - 10, offset * 10);
    res.send(images);
  });
  MongoClient.connect(databasePath, async function(err, client) {
    if (err) {
      console.log("Error connecting to database: " + err);
    } else {
      var db = client.db("image-search-abstraction-layer");
      var recentSearchesCollection = db.collection("latest-image-searches");
      var date = new Date();
      recentSearchesCollection.insert({"term": searchString, "when": date.toISOString()});
      
      var recentSearches = await recentSearchesCollection.find({}).toArray();
      if (recentSearches.length > 10) {
        recentSearches = recentSearches.slice(1, 11);
        console.log(recentSearches);
        recentSearchesCollection.remove();
        recentSearchesCollection.insert(recentSearches);
      }
    }
    client.close();
  });
});

app.get("/api/latest/imagesearch/", function(req, res) {
  MongoClient.connect(databasePath, async function(err, client) {
    if (err) {
      console.log("Error connecting to database: " + err);
    } else {
      var db = client.db("image-search-abstraction-layer");
      var recentSearchesCollection = db.collection("latest-image-searches");
      var recentSearches = await recentSearchesCollection.find({}).project({"_id": 0}).toArray();
      
      client.close();
      res.send(recentSearches);
    }
  });
});

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
