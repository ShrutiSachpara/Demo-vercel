const Joi = require("@hapi/joi");

module.exports = {
  addWishlist: Joi.object({
    userId: Joi.number().empty().required().messages({
      "number.base": `User id should be a type of number`,
      "number.empty": "User id  is not allowed to be empty",
      "number.required": `User id is Required`,
    }),
    productId: Joi.number().empty().required().messages({
      "number.base": `Product id should be a type of number`,
      "number.empty": "Product id  is not allowed to be empty",
      "number.required": `Product id is Required`,
    }),
  }),
  idValidation: Joi.object({
    id: Joi.number().empty().required().messages({
      "number.base": `Id should be a type of number`,
      "number.empty": "Id  is not allowed to be empty",
      "number.required": `Id is Required`,
    }),
  }),
  userIdValidation: Joi.object({
    userId: Joi.number().empty().required().messages({
      "number.base": `User id should be a type of number`,
      "number.empty": "User id  is not allowed to be empty",
      "number.required": `User id is Required`,
    }),
  }),
};
