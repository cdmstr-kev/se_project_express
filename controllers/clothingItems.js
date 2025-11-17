const ClothingItem = require("../models/clothingItem");
const {
  NotFoundError,
  BadRequestError,
  ForbiddenError,
} = require("../utils/errors");
const { SUCCESSFUL, CREATED } = require("../utils/success");

const getAllClothingItems = (req, res, next) => {
  ClothingItem.find()
    .then((clothingItems) => {
      res.json(clothingItems);
    })
    .catch(next);
};

const getClothingItemById = (req, res, next) => {
  ClothingItem.findById(req.params.clothingItemID)
    .orFail(() => new NotFoundError("Clothing item not found"))
    .then((clothingItem) => {
      res.status(SUCCESSFUL).json(clothingItem);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Invalid clothing item ID"));
      } else {
        next(err);
      }
    });
};

const createClothingItem = (req, res, next) => {
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
      if (err.name === "ValidationError") {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });
};

const deleteClothingItem = (req, res, next) => {
  ClothingItem.findById(req.params.clothingItemID)
    .then((clothingItem) => {
      if (!clothingItem) {
        return next(new NotFoundError("Clothing item not found"));
      }
      if (clothingItem.owner.toString() !== req.user._id.toString()) {
        return next(
          new ForbiddenError("You are not authorized to delete this item")
        );
      }
      return clothingItem.deleteOne();
    })
    .then(() =>
      res.status(SUCCESSFUL).json({ message: "Clothing item deleted" })
    )
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Invalid clothing item ID"));
      } else {
        next(err);
      }
    });
};

const likeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.clothingItemID,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((clothingItem) => {
      if (!clothingItem) {
        return next(new NotFoundError("Clothing item not found"));
      }
      return res.status(SUCCESSFUL).json(clothingItem);
    })
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError(err.message));
      } else if (err.name === "CastError") {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });
};

const dislikeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.clothingItemID,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((clothingItem) => {
      if (!clothingItem) {
        return next(new NotFoundError("Clothing item not found"));
      }
      return res.status(SUCCESSFUL).json(clothingItem);
    })
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError(err.message));
      } else if (err.name === "CastError") {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
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
