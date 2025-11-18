const express = require("express");
const auth = require("../middlewares/auth");

const router = express.Router();
const { getCurrentUser, updateUser } = require("../controllers/users");
const { validateProfileUpdate } = require("../middlewares/validation");

router.get("/me", auth, getCurrentUser);
router.patch(
  "/me",
  auth,
  validateProfileUpdate.validateProfileUpdate,
  updateUser
);

module.exports = router;
