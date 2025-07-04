import Song from "../models/song.js";
import User from "../models/user.js";

const createUser = async(req, res) => {
    try{
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch(err) {
        res.status(500).json({"internal server Error":  err.message});
    }
}

const likeSong = async (req, res) => {
    try{
        const {userId, songId} = req.params;
        const user = await User.findById(userId);
        const song = await Song.findById(songId);
        
        if(!song || !user){
            return res.status(404).json({error: "user or song not found"})
        }

        if(!song.likedBy.includes(userId)){
            song.likedBy.push(userId);
            await song.save();
        }
            
        if(!user.likedSongs.includes(songId)){
            user.likedSongs.push(songId);
            await user.save();
        }
    } catch(err) {
        res.status(500).json({"Server error":err.message});
    }
};

const unlikeSong = async(req, res) => {
    try{
        const {userId, songId} = req.params;
        const user = await User.findById(userId);
        const song = await Song.findById(songId);

        if(!song || !user){
            return res.status(404).json({error: "user or song not found"});
        }
        
        
        if(song.likedBy.includes(userId)){
            let index = song.likedBy.indexOf(userId);
            if(index !== -1)
                song.likedBy.splice(index,1);

            await song.save();
        }
            
        if(user.likedSongs.includes(songId)){
            let index = user.likedSongs.indexOf(songId);
            if(index !==-1)
                user.likedSongs.splice(index,1);
            await user.save();
        }
    } catch(err) {
        res.status(500).json({"error": err.message});
    }
}

const getUsersWithLikedSongs = async(req, res) => {
    try{
        let {userId} = req.params;
        const user = await User.findById(userId).populate("likedSongs");
        if(!user)
            return res.status(404).json("user not found");
        res.status(200).json(user);
    } catch(err) {
        res.status(500).json({"error": err.message});
    }
}

const getAllUsersWithLikedSongs = async(req, res) => {
    try{
        const users = await User.find().populate("likedSongs");
        res.status(200).json(users);
    } catch(err) {
        res.status(500).json({error: err.message});
    }
}

export {
    createUser,
    likeSong,
    unlikeSong,
    getUsersWithLikedSongs,
    getAllUsersWithLikedSongs
};