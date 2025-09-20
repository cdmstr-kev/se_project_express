const express = require("express");

const router = express.Router();
const {
  getAllClothingItems,
  getClothingItemById,
  createClothingItem,
  likeItem,
  dislikeItem,
  deleteClothingItem,
} = require("../controllers/clothingItems");

router.get("/", getAllClothingItems);
router.get("/:clothingItemID", getClothingItemById);
router.post("/", createClothingItem);
router.put("/:clothingItemID/likes", likeItem);
router.delete("/:clothingItemID/likes", dislikeItem);
router.delete("/:clothingItemID", deleteClothingItem);


module.exports = router;
