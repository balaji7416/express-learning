const express = require("express");
const router = express.Router();

const {
    getAllUsers,
    getUserById,
    addUser,
    updateUserbyId,
    deleteUserbyId
} = require("../controllers/studentController");

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/", addUser);
router.put("/:id",updateUserbyId);
router.delete("/:id", deleteUserbyId);

module.exports = router;