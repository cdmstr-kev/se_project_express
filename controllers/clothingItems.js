const ClothingItem = require("../models/clothingItem");

const getAllClothingItems = (req, res) => {  // Remove 'async'
  ClothingItem.find()
    .then((clothingItems) => {
      res.json(clothingItems);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.message });
    });
};

const getClothingItemById = (req, res) => {  // Remove 'async'
  ClothingItem.findById(req.params.clothingItemID)
    .then((clothingItem) => {
      if (!clothingItem) {
        return res.status(404).json({ error: "clothing item not found" });
      }
      res.json(clothingItem);
    })
    .catch((err) => {
      console.error(err);
      res.status(400).json({ error: "Invalid clothing item ID" });
    });
};

const createClothingItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  ClothingItem.create({
    name,
    weather,
    imageUrl,
    owner: "507f1f77bcf86cd799439011" // Don't forget the owner field!
  })
    .then((newClothingItem) => {
      res.status(201).json(newClothingItem);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).json({ error: err.message });
      }
      console.error(err);
      res.status(500).json({ error: err.message });
    });
};

module.exports = {
  getAllClothingItems,
  getClothingItemById,
  createClothingItem,
};
