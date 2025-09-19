const express = require("express");
const router = express.Router();
const {
  getAllClothingItems,
  getClothingItemById,
  createClothingItem,
} = require("../controllers/clothingItems");

router.get("/", getAllClothingItems);
router.get("/:clothingItemID", getClothingItemById);
router.post("/", createClothingItem);

module.exports = router;
