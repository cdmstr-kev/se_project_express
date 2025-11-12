const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const {
  BadRequestError,
  NotFoundError,
  ConflictError,
} = require("../utils/errors");
const { SUCCESSFUL, CREATED } = require("../utils/success");
const { JWT_SECRET } = require("../utils/config");

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail()
    .then((user) => res.status(SUCCESSFUL).json(user))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError("User not found"));
      } else if (err.name === "CastError") {
        next(new BadRequestError("Invalid User ID"));
      } else {
        next(err);
      }
    });
};

const createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;
  console.log("🔵 createUser called with:", req.body);

  bcrypt
    .hash(password, 10)
    .then((hashedPassword) =>
      User.create({
        name,
        avatar,
        email,
        password: hashedPassword,
      })
    )
    .then((newUser) => {
      const userObject = newUser.toObject();
      delete userObject.password;
      return res.status(CREATED).json(userObject);
    })
    .catch((err) => {
      console.log("🔴 Error caught in createUser:", err.name, err.message);
      if (err.name === "ValidationError") {
        next(new BadRequestError(err.message));
      } else if (err.code === 11000) {
        next(new ConflictError("Email already exists"));
      } else {
        next(err);
      }
    });
};

const updateUser = (req, res, next) => {
  const { name, avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, avatar },
    {
      new: true,
      runValidators: true,
      context: "query",
    }
  )
    .orFail()
    .then((updatedUser) => res.status(SUCCESSFUL).json(updatedUser))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError(err.message));
      } else if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError("User not found"));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new BadRequestError("Email and password required"));
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.status(SUCCESSFUL).json({ token });
    })
    .catch((err) => {
      if (err.message === "Incorrect email or password") {
        next(new BadRequestError("Incorrect email or password"));
      } else {
        next(err);
      }
    });
};

module.exports = { getCurrentUser, createUser, updateUser, login };
