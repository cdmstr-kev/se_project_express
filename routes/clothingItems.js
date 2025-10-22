const express = require("express");
const auth = require("../middlewares/auth");

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
router.post("/", auth, createClothingItem);
router.put("/:clothingItemID/likes", auth, likeItem);
router.delete("/:clothingItemID/likes", auth, dislikeItem);
router.delete("/:clothingItemID", auth, deleteClothingItem);

module.exports = router;
