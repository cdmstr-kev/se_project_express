const ClothingItem = require("../models/clothingItem");
const {
  CREATED,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  SUCCESSFUL,
  BAD_REQUEST,
} = require("../utils/errors");

const getAllClothingItems = (req, res) => {
  ClothingItem.find()
    .then((clothingItems) => {
      res.json(clothingItems);
    })
    .catch((err) => {
      console.error(err);
      res.status(INTERNAL_SERVER_ERROR).json({ error: err.message });
    });
};

const getClothingItemById = (req, res) => {
  ClothingItem.findById(req.params.clothingItemID)
    .orFail()
    .then((clothingItem) => {
      res.status(SUCCESSFUL).json(clothingItem);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).json({ error: "clothing item not found" });
      } else if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST)
          .json({ error: "Invalid clothing item ID" });
      }
      console.error(err);
      res.status(INTERNAL_SERVER_ERROR).json({ error: err.message });
    });
};

const createClothingItem = (req, res) => {
  console.log(req.user._id);

  const { name, weather, imageUrl } = req.body;
  ClothingItem.create({
    name,
    weather,
    imageUrl,
    owner: req.user._id,
  })
    .then((newClothingItem) => {
      res.status(CREATED).json(newClothingItem);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).json({ error: err.message });
      }
      console.error(err);
      res.status(INTERNAL_SERVER_ERROR).json({ error: err.message });
    });
};

module.exports = {
  getAllClothingItems,
  getClothingItemById,
  createClothingItem,
};
