const Joi = require("@hapi/joi");

module.exports = {
  cartValidation: Joi.object({
    user_id: Joi.number().empty().required().messages({
      "number.base": `User_id should be a type of number`,
      "number.empty": "User_id  is not allowed to be empty",
      "any.required": `User_id is Required`,
    }),
    quantity: Joi.number().empty().required().messages({
      "number.base": `Quantity should be a type of number`,
      "number.empty": "Quantity  is not allowed to be empty",
      "any.required": `Quantity is Required`,
    }),
    product_id: Joi.number().empty().required().messages({
      "number.base": `Product_id should be a type of number`,
      "number.empty": "Product_id  is not allowed to be empty",
      "any.required": `Product_id is Required`,
    }),
  }),
  idValidation: Joi.object({
    user_id: Joi.number().empty().required().messages({
      "number.base": `User_id should be a type of number`,
      "number.empty": "User_id  is not allowed to be empty",
      "any.required": `User_id is Required`,
    }),
  }),
  idDeleteValidation: Joi.object({
    id: Joi.number().empty().required().messages({
      "number.base": `id should be a type of number`,
      "number.empty": "id  is not allowed to be empty",
      "any.required": `id is Required`,
    }),
  }),
};
