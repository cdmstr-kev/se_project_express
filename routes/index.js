const router = require("express").Router();
const clothingItemsRouter = require("./clothingItems");
const usersRouter = require("./users");

const {
  validateUser,
  validateAuthentication,
} = require("../middlewares/validation");

const { login, createUser } = require("../controllers/users");

router.post("/signin", validateAuthentication.validateUserLogin, login);
router.post("/signup", validateUser.validateUserRegistration, createUser);

router.use("/items", clothingItemsRouter);
router.use("/users", usersRouter);

module.exports = router;
