const User = require("../models/user");
const {
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  SUCCESSFUL,
  CREATED,
} = require("../utils/errors");

const getAllUsers = (req, res) => {
  User.find()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.error(err);
      return res.status(INTERNAL_SERVER_ERROR).json({ message: err.message });
    });
};

const getUserById = (req, res) => {
  User.findById(req.params.userID)
    .orFail()
    .then((user) => res.status(SUCCESSFUL).json(user))
    .catch((err) => {
      console.log(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).json({ message: "User not found" });
      }
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).json({ message: "Invalid user ID" });
      }
      console.error(err);
      return res.status(INTERNAL_SERVER_ERROR).json({ message: err.message });
    });
};

const createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((newUser) => res.status(CREATED).json(newUser))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).json({ message: err.message });
      }
      console.error(err);
      return res.status(INTERNAL_SERVER_ERROR).json({ message: err.message });
    });
};

module.exports = { getAllUsers, getUserById, createUser };
