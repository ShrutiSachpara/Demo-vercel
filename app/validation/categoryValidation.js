const Joi = require("@hapi/joi");

module.exports = {
  addCategory: Joi.object({
    user_id: Joi.number().empty().required().messages({
      "number.base": `User_id should be a type of number`,
      "number.empty": "User_id  is not allowed to be empty",
      "number.required": `User_id is Required`,
    }),
    name: Joi.string().required().empty().messages({
      "string.base": `Category name should be a type of 'text'`,
      "string.empty": `Category name should be an empty field`,
      "any.required": `Category name is a required field`,
    }),
    description: Joi.string().required().empty().messages({
      "string.base": `Description should be a type of 'text'`,
      "string.empty": `Description should be an empty field`,
      "any.required": `Description is a required field`,
    })
  }),
  testCategory: Joi.object({
    user_id: Joi.number().empty().required().messages({
      "number.base": `User_id should be a type of number`,
      "number.empty": "User_id  is not allowed to be empty",
      "number.required": `User_id is Required`,
    }),
    name: Joi.string().required().empty().messages({
      "string.base": `Category name should be a type of 'text'`,
      "string.empty": `Category name should be an empty field`,
      "any.required": `Category name is a required field`,
    }),
    description: Joi.string().required().empty().messages({
      "string.base": `Description should be a type of 'text'`,
      "string.empty": `Description should be an empty field`,
      "any.required": `Description is a required field`,
    }),
    image: Joi.string().required().empty().messages({
      "string.base": `Image should be a type of 'text'`,
      "string.empty": `Image should be an empty field`,
      "any.required": `Image is a required field`,
    }),
  }),
  idValidation: Joi.object({
    id: Joi.number().empty().required().messages({
      "number.base": `id should be a type of number`,
      "number.empty": "id  is not allowed to be empty",
      "number.required": `id is Required`,
    }),
  }),
};
