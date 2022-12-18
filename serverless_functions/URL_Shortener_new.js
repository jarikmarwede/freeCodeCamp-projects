import util from "util";
import dns from "dns";
import mongodb from "mongodb";

const MongoClient = mongodb.MongoClient;
const databaseUrl = process.env.URL_SHORTENER_DATABASE_URL || "mongodb://localhost/url-shortener-microservice";
const dnsLookup = util.promisify(dns.lookup);

export async function handler(event, context) {
    const jsonBody = JSON.parse(event.body);
    const inputUrl = jsonBody["url"];

    if (inputUrl === undefined) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                "error": "No url was specified"
            })
        }
    }

    if (inputUrl.search(/^http(s)?:\/\/(.)+(\.)(.)+/gi) !== -1) {
        try {
            await dnsLookup(inputUrl.split("://")[1].split("/")[0]);
        } catch (error) {
            return invalidUrl();
        }
        let shortUrl;
        if (process.env.NODE_ENV === "production") {
            shortUrl = extractNetlifySiteFromContext(context)
        } else {
            shortUrl = "localhost:8888";
        }
        shortUrl += "/Back_End_Development_and_APIs_Certification/URL_Shortener_Microservice/s?i=";

        const dbClient = new MongoClient(databaseUrl);
        try {
            await dbClient.connect();
        } catch (error) {
            console.log("Error connecting to database: " + error);
            return {
                statusCode: 500,
                body: JSON.stringify({
                    "error": "Could not connect to database"
                })
            }
        }
        const db = dbClient.db("url-shortener-microservice");
        const collection = db.collection("shortened-urls");

        const urlResult = await collection.find({"original_url": inputUrl}).toArray();
        if (urlResult.length > 0) {
            shortUrl += urlResult[0]["id"];
        } else {
            const allDocuments = await collection.find({}).toArray();
            await collection.insertOne({"original_url": inputUrl, "id": allDocuments.length});
            shortUrl += allDocuments.length;
        }
        dbClient.close().then();

        const responseJSON = {
            "original_url": inputUrl,
            "short_url": shortUrl
        };
        return {
            statusCode: 200,
            body: JSON.stringify(responseJSON)
        }
    } else {
        return invalidUrl();
    }
}

function invalidUrl() {
    return {
        statusCode: 400,
        body: JSON.stringify({
            "error": "URL invalid"
        })
    }
}

function extractNetlifySiteFromContext(context) {
    const data = context.clientContext.custom.netlify;
    return JSON.parse(Buffer.from(data, "base64").toString("utf-8"))["site_url"];
}
