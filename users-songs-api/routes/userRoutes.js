import {
    createUser,
    likeSong,
    unlikeSong,
    getUsersWithLikedSongs,
    getAllUsersWithLikedSongs
} from "../controllers/userController.js"

import {
    createSong,
    getSongById,
    getAllSongs
} from "../controllers/songController.js"

import express from "express";

const router = express.Router();

router.post("/createUser",createUser);
router.patch("/user/:userId/song/:songId/like",likeSong);
router.patch("/user/:userId/song/:songId/unlike",unlikeSong);
router.get("/user/:userId",getUsersWithLikedSongs);
router.get("/users",getAllUsersWithLikedSongs);

router.post("/createSong",createSong);
router.get("/song/:songId",getSongById);
router.get("/songs",getAllSongs);

export default router;