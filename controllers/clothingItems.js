const ClothingItem = require("../models/clothingItem");
const {
  CREATED,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  SUCCESSFUL,
  BAD_REQUEST,
} = require("../utils/errors");
const { SUCCESSFUL, CREATED } = require("../utils/success");

const getAllClothingItems = (req, res) => {
  ClothingItem.find()
    .then((clothingItems) => {
      res.json(clothingItems);
    })
    .catch((err) => {
      console.error(err);
      res
        .status(INTERNAL_SERVER_ERROR)
        .json({ message: "An error has occurred on the server." });
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
        return res
          .status(NOT_FOUND)
          .json({ message: "clothing item not found" });
      }
      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST)
          .json({ message: "Invalid clothing item ID" });
      }
      console.error(err);
      return res
        .status(INTERNAL_SERVER_ERROR)
        .json({ message: "An error has occurred on the server." });
    });
};

const createClothingItem = (req, res) => {
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
        return res.status(BAD_REQUEST).json({ message: err.message });
      }
      console.error(err);
      return res
        .status(INTERNAL_SERVER_ERROR)
        .json({ message: "An error has occurred on the server." });
    });
};

const deleteClothingItem = (req, res) => {
  ClothingItem.findByIdAndDelete(req.params.clothingItemID)
    .then((clothingItem) => {
      if (!clothingItem) {
        return res
          .status(NOT_FOUND)
          .json({ message: "Clothing item not found" });
      }
      return res.status(SUCCESSFUL).json({ message: "Clothing item deleted" });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST)
          .json({ message: "Invalid clothing item ID" });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .json({ message: "An error has occurred on the server." });
    });
};

const likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.clothingItemID,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((clothingItem) => {
      if (!clothingItem) {
        return res
          .status(NOT_FOUND)
          .json({ message: "Clothing item not found" });
      }
      return res.status(SUCCESSFUL).json(clothingItem);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).json({ message: err.message });
      }
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).json({ message: err.message });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .json({ message: "An error has occurred on the server." });
    });
};

const dislikeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.clothingItemID,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((clothingItem) => {
      if (!clothingItem) {
        return res
          .status(NOT_FOUND)
          .json({ message: "Clothing item not found" });
      }
      return res.status(SUCCESSFUL).json(clothingItem);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).json({ message: err.message });
      }
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).json({ message: err.message });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .json({ message: "An error has occurred on the server." });
    });
};

module.exports = {
  getAllClothingItems,
  getClothingItemById,
  createClothingItem,
  likeItem,
  dislikeItem,
  deleteClothingItem,
};
