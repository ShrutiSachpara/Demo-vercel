const Joi = require("@hapi/joi");

module.exports = {
  customerValidation: Joi.object({
    startDate: Joi.date().empty().messages({
      "date.base": `StartDate should be a type of text`,
      "date.empty": "StartDate is not allowed to be empty",
      "any.required": `StartDate is Required`,
    }),
    endDate: Joi.date().empty().messages({
      "date.base": `EndDate should be a type of text`,
      "date.empty": "EndDate is not allowed to be empty",
      "any.required": `EndDate is Required`,
    }),
  }),
  vendorValidation: Joi.object({
    startDate: Joi.date().empty().messages({
      "date.base": `StartDate should be a type of text`,
      "date.empty": "StartDate is not allowed to be empty",
      "any.required": `StartDate is Required`,
    }),
    endDate: Joi.date().empty().messages({
      "date.base": `EndDate should be a type of text`,
      "date.empty": "EndDate is not allowed to be empty",
      "any.required": `EndDate is Required`,
    }),
  }),
  adminValidation: Joi.object({
    order_status: Joi.string().empty().messages({
      "string.base": "Order_status should be a type of text",
      "string.empty": "Order_status is not allowed to be empty",
      "any.required": `Order_status is Required`,
    }),
    flag: Joi.number().empty().required().messages({
      "string.base": "Flag should be a type of id",
      "string.empty": "Flag is not allowed to be empty",
      "any.required": `Flag is Required`,
    })
  }),
  idValidation: Joi.object({
    user_id: Joi.number().empty().required().messages({
      "number.base": `User_id should be a type of number`,
      "number.empty": "User_id  is not allowed to be empty",
      "any.required": `User_id is Required`,
    }),
  })
};