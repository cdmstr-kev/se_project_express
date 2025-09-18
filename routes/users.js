const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  createUser,
} = require("../controllers/users");

router.get("/", getAllUsers);
router.get("/:userID", getUserById);
router.post("/", createUser);

module.exports = router;
