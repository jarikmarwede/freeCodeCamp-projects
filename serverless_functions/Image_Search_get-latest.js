import mongodb from "mongodb";

const MongoClient = mongodb.MongoClient;
const databasePath = process.env.IMAGE_SEARCH_ABSTRACTION_LAYER_DATABASE_URL || "mongodb://localhost/image-search-abstraction-layer";

export async function handler() {
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
    const recentSearches = await recentSearchesCollection.find({}).project({"_id": 0}).toArray();
    await dbClient.close();

    return {
        statusCode: 200,
        body: JSON.stringify(recentSearches)
    }
}
