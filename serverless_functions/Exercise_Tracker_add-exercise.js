import User from "../Back_End_Development_and_APIs_Certification/Exercise_Tracker/user.js";
import mongoose from "mongoose";

export async function handler(event) {
    const body = JSON.parse(event.body);
    await mongoose.connect(process.env.EXERCISE_TRACKER_DATABASE_URL || "mongodb://localhost/exercise-tracker");

    let functionResult;
    try {
        const user = await User.findOne({_id: body["userId"]}, "_id username exercises");
        if (user) {
            user.exercises.push({description: body["description"], duration: body["duration"], date: body["date"] ? body["date"] : new Date().toISOString()});
            try {
                await user.save();
                functionResult = {
                    statusCode: 200,
                    body: JSON.stringify(user)
                }
            } catch (e) {
                functionResult = {
                    statusCode: 500,
                    body: JSON.stringify({
                        "error": "Unexpected server error"
                    })
                }
            }
        } else {
            functionResult = {
                statusCode: 404,
                body: JSON.stringify({
                    "error": "Could not find user"
                })
            }
            return res.sendStatus(404);
        }
    } catch (e) {
        functionResult = {
            statusCode: 500,
            body: JSON.stringify({
                "error": "Unexpected server error"
            })
        }
    } finally {
        await mongoose.disconnect();
    }
    return functionResult;
}
