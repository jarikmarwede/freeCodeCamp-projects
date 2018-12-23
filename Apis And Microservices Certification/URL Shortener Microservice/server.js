const util = require("util");
const dns = require("dns");
const mongodb = require("mongodb");
const express = require("express");
const bodyParser = require("body-parser");

const MongoClient = mongodb.MongoClient;
const databaseUrl = process.env.URL_SHORTENER_DATABASE_URL;
const app = express();
const lookup = util.promisify(dns.lookup);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/:id", async (req, res) => {
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

app.post("/api/shorturl/new", async (req, res) => {
  const inputUrl = req.body.url;

  if (inputUrl.search(/^http(s)?:\/\/(.)+(\.){1}(.)+/gi) != -1) {
    try {
      const lookupResult = await lookup(inputUrl.split("://")[-1]);
    } catch(err) {
      invalidUrl(res);
    }
    let shortUrl = req.protocol + '://' + req.get('host') + "/";

    MongoClient.connect(databaseUrl, async (err, client) => {
      if (err) {
        console.log("Error connecting to database: " + err);
      } else {
        const db = client.db("url-shortener-microservice");
        const collection = db.collection("shortened-urls");

        const urlResult = await collection.find({"original_url": inputUrl}).toArray();
        if (urlResult.length > 0) {
          shortUrl += urlResult[0]["id"];
        } else {
          const allDocuments = await collection.find({}).toArray();
          collection.insert({"original_url": inputUrl, "id": allDocuments.length});
          shortUrl += allDocuments.length;
        }
        client.close();

        const responseJSON = {
          "original_url": inputUrl,
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

module.exports = app;
