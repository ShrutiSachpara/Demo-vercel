const Joi = require("@hapi/joi");

module.exports = {
  addProduct: Joi.object({
    user_id: Joi.number().empty().required().messages({
      "number.base": `UserId should be a type of number`,
      "number.empty": "UserId  is not allowed to be empty",
      "number.required": `UserId is Required`,
    }),
    category_id: Joi.number().empty().required().messages({
      "number.base": `Category id should be a type of number`,
      "number.empty": "Category id  is not allowed to be empty",
      "number.required": `Category id is Required`,
    }),
    product_name: Joi.string().required().empty().messages({
      "string.base": `Product name should be a type of 'text'`,
      "string.empty": `Product name should be an empty field`,
      "any.required": `Product name is a required field`,
    }),
    product_price: Joi.number().empty().required().messages({
      "number.base": `Product price should be a type of number`,
      "number.empty": "Product price  is not allowed to be empty",
      "number.required": `Product price is Required`,
    }),
    description: Joi.string().required().empty().messages({
      "string.base": `Description should be a type of 'text'`,
      "string.empty": `Description should be an empty field`,
      "any.required": `Description is a required field`,
    }),
    size: Joi.string().messages({
      "string.base": `Size should be a type of 'text'`,
    }),
    quantity: Joi.number().empty().required().messages({
      "number.base": `Quantity should be a type of number`,
      "number.empty": "Quantity  is not allowed to be empty",
      "number.required": `Quantity is Required`,
    }),
  }),
  idValidation: Joi.object({
    id: Joi.number().empty().required().messages({
      "number.base": `Id should be a type of number`,
      "number.empty": "Id  is not allowed to be empty",
      "number.required": `Id is Required`,
    }),
  }),
};
