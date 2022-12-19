import User from "../Back_End_Development_and_APIs_Certification/Exercise_Tracker/user.js";
import mongoose from "mongoose";

export async function handler(event) {
    const body = JSON.parse(event.body);
    await mongoose.connect(process.env.EXERCISE_TRACKER_DATABASE_URL || "mongodb://localhost/exercise-tracker");
    const user = new User({username: body["username"]});

    let functionResult;
    try {
        await user.save();
        functionResult = {
            statusCode: 201,
            body: JSON.stringify({
                username: user.username,
                _id: user._id
            })
        }
    } catch (e) {
        functionResult = {
            statusCode: 500,
            body: JSON.stringify({
                "error": "Could not add user"
            })
        }
    } finally {
        await mongoose.disconnect();
    }
    return functionResult;
}
