const util = require("util");
const dns = require("dns");
const mongodb = require("mongodb");
const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const upload = multer();

const MongoClient = mongodb.MongoClient;
const databaseUrl = process.env.URL_SHORTENER_DATABASE_URL || "mongodb://localhost/url-shortener-microservice";
const app = express();
const dnsLookup = util.promisify(dns.lookup);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/:id", async (req, res) => {
  if (!isNaN(parseInt(req.params.id)) && Number.isInteger(parseInt(req.params.id))) {
    const urlId = parseInt(req.params.id);

    const dbClient = new MongoClient(databaseUrl);
    try {
      await dbClient.connect();
    } catch (error) {
      console.log("Error connecting to database: " + error);
      res.sendStatus(500);
      return;
    }
    const db = dbClient.db("url-shortener-microservice");
    const collection = db.collection("shortened-urls");
    const idResult = await collection.find({"id": urlId}).toArray();
    dbClient.close().then();
    if (idResult.length > 0) {
      res.redirect(idResult[0]["original_url"]);
    } else {
      invalidUrl(res);
    }
  } else {
    invalidUrl(res);
  }
});

app.post("/shorturl/new", upload.none(), async (req, res) => {
  const inputUrl = req.body.url;
  if (inputUrl === undefined) {
    await res.status(400).json({"error": "No url was specified"});
    return;
  }

  if (inputUrl.search(/^http(s)?:\/\/(.)+(\.)(.)+/gi) !== -1) {
    try {
      await dnsLookup(inputUrl.split("://")[-1]);
    } catch {
      invalidUrl(res);
    }
    let shortUrl = req.protocol + '://' + req.get('host') + "/url-shortener-microservice/";

    const dbClient = new MongoClient(databaseUrl);
    try {
      await dbClient.connect();
    } catch (error) {
      console.log("Error connecting to database: " + error);
      res.sendStatus(500);
      return;
    }
    const db = dbClient.db("url-shortener-microservice");
    const collection = db.collection("shortened-urls");

    const urlResult = await collection.find({"original_url": inputUrl}).toArray();
    if (urlResult.length > 0) {
      shortUrl += urlResult[0]["id"];
    } else {
      const allDocuments = await collection.find({}).toArray();
      collection.insert({"original_url": inputUrl, "id": allDocuments.length});
      shortUrl += allDocuments.length;
    }
    dbClient.close().then();

    const responseJSON = {
      "original_url": inputUrl,
      "short_url": shortUrl
    };
    await res.status(200).json(responseJSON);
  } else {
    invalidUrl(res);
  }
});


function invalidUrl(res) {
  res.status(400).json({"error": "URL invalid"});
}

module.exports = app;
