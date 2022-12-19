import mongoose from "mongoose";

const Schema = mongoose.Schema;
const user = new Schema({
    username: String,
    exercises: [{
        description: String,
        duration: Number,
        date: { type: Date, default: Date.now }
    }]
}, {usePushEach: true});
const User = mongoose.model("User", user);


export default User;
