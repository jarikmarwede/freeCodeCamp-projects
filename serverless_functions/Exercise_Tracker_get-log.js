import User from "../Back_End_Development_and_APIs_Certification/Exercise_Tracker/user.js";
import mongoose from "mongoose";

export async function handler(event) {
    await mongoose.connect(process.env.EXERCISE_TRACKER_DATABASE_URL || "mongodb://localhost/exercise-tracker");

    let functionResponse;
    try {
        const user = await User.findById(event.queryStringParameters["userId"], "_id username exercises");
        user.count = user.exercises.length;
        if (event.queryStringParameters["to"]) {
            user.exercises = user.exercises.filter(exercise => new Date(exercise.date).getTime() <= new Date(event.queryStringParameters["to"]).getTime());
        }
        if (event.queryStringParameters["from"]) {
            user.exercises = user.exercises.filter(exercise => new Date(exercise.date).getTime() >= new Date(event.queryStringParameters["from"]).getTime());
        }
        if (event.queryStringParameters["limit"]) {
            user.exercises = user.exercises.slice(0, event.queryStringParameters["limit"]);
        }
        functionResponse = {
            statusCode: 200,
            body: JSON.stringify(user)
        }
    } catch (e) {
        functionResponse = {
            statusCode: 500,
            body: JSON.stringify({
                "error": "Could not find user"
            })
        }
    } finally {
        await mongoose.disconnect();
    }
    return functionResponse;
}
