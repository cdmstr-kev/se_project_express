const express = require("express");
const auth = require("../middlewares/auth");
const { validateId, validateItem } = require("../middlewares/validation");

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
router.get(
  "/:clothingItemID",
  auth,
  validateId.validateId,
  getClothingItemById
);
router.post("/", auth, validateItem.validateItemCreation, createClothingItem);
router.put("/:clothingItemID/likes", auth, validateId.validateId, likeItem);
router.delete(
  "/:clothingItemID/likes",
  auth,
  validateId.validateId,
  dislikeItem
);
router.delete(
  "/:clothingItemID",
  auth,
  validateId.validateId,
  deleteClothingItem
);

module.exports = router;
