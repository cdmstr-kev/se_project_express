const User = require("../models/user");

const getAllUsers = (req, res) => {
  User.find()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.message });
    });
};

const getUserById = (req, res) => {
  User.findById(req.params.userID)
    .orFail()
    .then((user) =>
      res.status(200).json(user)
    )
    .catch((err) => {
      console.log(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).json({ error: "User not found" });
      }else if (err.name === "CastError") {
        return res.status(400).json({ error: "Invalid user ID" });
      }
      console.error(err);
      res.status(500).json({ error: err.message });
    });
};

const createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((newUser) => {
      res.status(201).json(newUser);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).json({ error: err.message });
      }
      console.error(err);
      res.status(500).json({ error: err.message });
    });
};


module.exports = { getAllUsers, getUserById, createUser };
