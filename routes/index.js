const router = require("express").Router();
const clothingItemsRouter = require("./clothingItems");
const usersRouter = require("./users");

const { login, createUser } = require("../controllers/users");

router.post("/signin", login);
router.post("/signup", createUser);

router.use("/items", clothingItemsRouter);
router.use("/users", usersRouter);

module.exports = router;
