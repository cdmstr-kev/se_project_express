const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};
const validateItem = {
  validateItemCreation: celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).messages({
        "string.empty": "The 'Name' field must be filled in",
        "string.min": 'The minimum length of the "name" field is 2',
        "string.max": 'The maximum length of the "name" field is 30',
      }),
      weather: Joi.string().valid("hot", "warm", "cold").required(),
      imageUrl: Joi.string().required().custom(validateURL).messages({
        "string.empty": "The 'ImageUrl' field must be filled in",
        "string.uri": "The 'ImageUrl' field must be a valid URL",
      }),
    }),
  }),
};

const validateUser = {
  validateUserRegistration: celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      name: Joi.string().min(2).max(30).messages({
        "string.empty": "The 'Name' field must be filled in",
        "string.min": 'The minimum length of the "name" field is 2',
        "string.max": 'The maximum length of the "name" field is 30',
      }),
      avatar: Joi.string().required().custom(validateURL).messages({
        "string.empty": "The 'ImageUrl' field must be filled in",
        "string.uri": "The 'ImageUrl' field must be a valid URL",
      }),
    }),
  }),
};

const validateAuthentication = {
  validateUserLogin: celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
};

const validateId = {
  validateId: celebrate({
    params: Joi.object().keys({
      clothingItemID: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
    }),
  }),
};

const validateProfileUpdate = {
  validateProfileUpdate: celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required().messages({
        "string.empty": "The 'Name' field must be filled in",
        "string.min": 'The minimum length of the "name" field is 2',
        "string.max": 'The maximum length of the "name" field is 30',
      }),
      avatar: Joi.string().required().custom(validateURL).messages({
        "string.empty": "The 'ImageUrl' field must be filled in",
      }),
    }),
  }),
};

module.exports = {
  validateURL,
  validateAuthentication,
  validateUser,
  validateItem,
  validateId,
  validateProfileUpdate,
};
