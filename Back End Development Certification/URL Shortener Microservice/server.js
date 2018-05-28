var mongodb = require("mongodb");
var express = require('express');

var MongoClient = mongodb.MongoClient;
var databaseUrl = process.env.DATABASE_URL;
var app = express();

app.use(express.static('public'));
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/:id", function (req, res) {
  if (parseInt(req.params.id) != NaN && Number.isInteger(parseInt(req.params.id))) {
    var urlId = parseInt(req.params.id);

    MongoClient.connect(databaseUrl, async function(err, client) {
      if (err) {
        console.log("Error connecting to database: " + err);
      } else {
        var db = client.db("url-shortener-microservice");
        var collection = db.collection("shortened-urls");
        var idResult = await collection.find({"id": urlId}).toArray();
        
        if (idResult.length > 0) {
          res.redirect(idResult[0]["original_url"]);
          client.close();
        } else {
          client.close();
          invalidUrl(res);
        }
      }
    });
  } else {
    invalidUrl(res);
  }
});

app.get("/new/*?", async function (req, res) {
  if (req.params[0].search(/^http(s)?:\/\/(.)+(\.){1}(.)+/gi) != -1) {
    var originalUrl = req.params[0];
    var shortUrl = req.protocol + '://' + req.get('host') + "/";

    MongoClient.connect(databaseUrl, async function(err, client) {
      if (err) {
        console.log("Error connecting to database: " + err);
      } else {
        var db = client.db("url-shortener-microservice");
        var collection = db.collection("shortened-urls");

        var urlResult = await collection.find({"original_url": originalUrl}).toArray();
        if (urlResult.length > 0) {
          shortUrl += urlResult[0]["id"];
        } else {
          var allDocuments = await collection.find({}).toArray();
          collection.insert({"original_url": originalUrl, "id": allDocuments.length});
          shortUrl += allDocuments.length;
        }
        client.close();
        
        var responseJSON = {
          "original_url": originalUrl,
          "short_url": shortUrl
        };
        res.send(responseJSON);
      }
    });
  } else {
    invalidUrl(res);
  }
});


function invalidUrl(res) {
  res.status(400);
  res.send({"error": "URL invalid"});
};

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
