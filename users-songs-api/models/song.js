import mongoose from "mongoose";

const SongSchema = new mongoose.Schema({
    name: {
        type: String,
        default: "default Song"
    },
    author: {
        type: String,
        default: "Unknown"
    },
    likedBy :[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    
    }]
});

export default mongoose.model("Song", SongSchema);