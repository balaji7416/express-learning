import User from "../models/user.js";
import Song from "../models/song.js";

const createSong = async (req, res) => {
    try{
        const song = await Song.create(req.body);
        res.status(201).json(song);
    } catch(err) {
        res.status(500).json({error: err.message});
    }
}

const getSongById = async (req, res) => {
    try{
        const {songId} = req.params;
        const song = Song.findById(songId);
        if(!song)
            return res.status(404).json({error: "song not found"});
        res.status(200).json(song);
    } catch(err) {
        res.status(500).json({error: err.message});
    }
}

const getAllSongs = async (req, res) => {
    try{
        const songs = await Song.find();
        res.status(200).json(songs);
    } catch(err) {
        res.status(500).json({error: err.message});
    }
}

export {
    createSong,
    getSongById,
    getAllSongs
};