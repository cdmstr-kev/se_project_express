const router = require("express").Router();
const clothingItemsRouter = require("./clothingItems");

const { login, createUser } = require("../controllers/users");

router.use("/items", clothingItemsRouter);

router.post("/signin", login);
router.post("/signup", createUser);

module.exports = router;
