import mongodb from "mongodb";

const MongoClient = mongodb.MongoClient;
const databaseUrl = process.env.URL_SHORTENER_DATABASE_URL || "mongodb://localhost/url-shortener-microservice";

export async function handler(event) {
    const id = event.queryStringParameters["i"];
    if (!isNaN(parseInt(id)) && Number.isInteger(parseInt(id))) {
        const urlId = parseInt(id);

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
            };
        }
        const db = dbClient.db("url-shortener-microservice");
        const collection = db.collection("shortened-urls");
        const idResult = await collection.find({"id": urlId}).toArray();
        dbClient.close().then();
        if (idResult.length > 0) {
            return {
                statusCode: 300,
                body: JSON.stringify({
                    "url": idResult[0]["original_url"]
                })
            }
        } else {
            return invalidUrl();
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
