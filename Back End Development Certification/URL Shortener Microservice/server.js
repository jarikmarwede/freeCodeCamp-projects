const mongodb = require("mongodb");
const express = require('express');

const MongoClient = mongodb.MongoClient;
const databaseUrl = process.env.DATABASE_URL;
const app = express();

app.use(express.static('public'));

app.get("/", (request, response) => {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/:id", (req, res) => {
  if (parseInt(req.params.id) != NaN && Number.isInteger(parseInt(req.params.id))) {
    const urlId = parseInt(req.params.id);

    MongoClient.connect(databaseUrl, async (err, client) => {
      if (err) {
        console.log("Error connecting to database: " + err);
      } else {
        const db = client.db("url-shortener-microservice");
        const collection = db.collection("shortened-urls");
        const idResult = await collection.find({"id": urlId}).toArray();

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

app.get("/new/*?", async (req, res) => {
  if (req.params[0].search(/^http(s)?:\/\/(.)+(\.){1}(.)+/gi) != -1) {
    const originalUrl = req.params[0];
    let shortUrl = req.protocol + '://' + req.get('host') + "/";

    MongoClient.connect(databaseUrl, async function(err, client) {
      if (err) {
        console.log("Error connecting to database: " + err);
      } else {
        const db = client.db("url-shortener-microservice");
        const collection = db.collection("shortened-urls");

        const urlResult = await collection.find({"original_url": originalUrl}).toArray();
        if (urlResult.length > 0) {
          shortUrl += urlResult[0]["id"];
        } else {
          const allDocuments = await collection.find({}).toArray();
          collection.insert({"original_url": originalUrl, "id": allDocuments.length});
          shortUrl += allDocuments.length;
        }
        client.close();

        const responseJSON = {
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

const listener = app.listen(process.env.PORT, () => {
  console.log('The app is listening on port ' + listener.address().port);
});
