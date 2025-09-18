const User = require("../models/user");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userid);
    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: "Invalid user ID" });
  }
};

const createUser = async (req, res) => {
  try {
    const {name, avatar } = req.body;
    const newUser = new User({ name, avatar });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { getAllUsers, getUserById, createUser };
