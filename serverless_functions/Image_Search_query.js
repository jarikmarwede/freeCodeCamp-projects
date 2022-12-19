import fetch from "node-fetch";
import mongodb from "mongodb";

const MongoClient = mongodb.MongoClient;
const databasePath = process.env.IMAGE_SEARCH_ABSTRACTION_LAYER_DATABASE_URL || "mongodb://localhost/image-search-abstraction-layer";

export async function handler(event) {
    const searchString = event.queryStringParameters["query"];
    const offset = event.queryStringParameters["offset"] || 1;
    const APICallString = "https://contextualwebsearch-websearch-v1.p.mashape.com/api/Search/ImageSearchAPI?count=" + offset * 10 + "&q=" + searchString + "&autocorrect=false";

    const controller = new AbortController();
    const timeout = setTimeout(() => {
        controller.abort();
    }, 1000);
    const apiPromise = fetch(APICallString, {
        headers: {
            "X-RapidAPI-Key": process.env.RAPID_API_KEY
        },
        signal: controller.signal
    }).catch(() => {});

    const dbClient = new MongoClient(databasePath);
    try {
        await dbClient.connect();
    } catch (error) {
        console.log("Error connecting to database: " + error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                "error": "Unexpected server error"
            })
        }
    }
    const db = dbClient.db("image-search-abstraction-layer");
    const recentSearchesCollection = db.collection("latest-image-searches");
    const date = new Date();
    const timestampInsertion = recentSearchesCollection.insertOne({"term": searchString, "when": date.toISOString()});

    let recentSearches = await recentSearchesCollection.find({}).toArray();
    if (recentSearches.length > 10) {
        recentSearches = recentSearches.slice(1, 11);
        await recentSearchesCollection.deleteMany({});
        await recentSearchesCollection.insertMany(recentSearches);
    }
    await timestampInsertion;
    await dbClient.close();

    const apiResponse = await apiPromise;
    clearTimeout(timeout);
    if (apiResponse === undefined) {
        return {
            statusCode: 502,
            body: JSON.stringify({
                "error": "API could not be reached"
            })
        }
    }
    const responseData = await apiResponse.json();
    const images = responseData.value.slice(offset * 10 - 10, offset * 10);
    return {
        statusCode: 200,
        body: JSON.stringify(images)
    }
}
