const router = require("express").Router();
const clothingItemsRouter = require("./clothingItems");
const usersRouter = require("./users");


router.use("/users", usersRouter);
router.use("/items", clothingItemsRouter);


module.exports = router;
