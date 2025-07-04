import mongoose  from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        default: "defaultEmail@user.com"
    },
    likedSongs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Song"
    }]
});

export default mongoose.model("User", userSchema);