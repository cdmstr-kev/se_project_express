const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

module.exports.validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

module.exports.validateItem = {
  validateItemCreation: celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).messages({
        "string.empty": "The 'Name' field must be filled in",
        "string.min": 'The minimum length of the "name" field is 2',
        "string.max": 'The maximum length of the "name" field is 30',
      }),
      imageUrl: Joi.string().required().custom(validateURL).messages({
        "string.empty": "The 'ImageUrl' field must be filled in",
        "string.uri": "The 'ImageUrl' field must be a valid URL",
      }),
    }),
  }),
};

module.exports.validateUser = {
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

module.exports.validateAuthentication = {
  validateUserLogin: celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
};

module.exports.validateId = {
  validateId: celebrate({
    params: Joi.object().keys({
      clothingItemID: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
    }),
  }),
};
