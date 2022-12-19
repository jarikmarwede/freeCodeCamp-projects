import User from "../Back_End_Development_and_APIs_Certification/Exercise_Tracker/user.js";
import mongoose from "mongoose";

export async function handler() {
    await mongoose.connect(process.env.EXERCISE_TRACKER_DATABASE_URL || "mongodb://localhost/exercise-tracker");

    let functionResult;
    try {
        const users = await User.find({}, "username _id");
        functionResult = {
            statusCode: 200,
            body: JSON.stringify(users)
        }
    } catch (e) {
        functionResult = {
            statusCode: 500,
            body: JSON.stringify({
                "error": "Could not find any user"
            })
        }
    } finally {
        await mongoose.disconnect();
    }
    return functionResult;
}
