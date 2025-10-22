const express = require("express");
const auth = require("../middlewares/auth");

const router = express.Router();
// TODO: remove this before submitting project
const { getCurrentUser, updateUser } = require("../controllers/users");

// TODO: remove the routes below and possible delete this file

// router.get("/", getAllUsers);
router.get("/me", auth, getCurrentUser);
// TODO change the controller in this router.
router.patch("/me", auth, updateUser);
// router.post("/", createUser);

module.exports = router;
