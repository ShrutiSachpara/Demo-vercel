const Joi = require("@hapi/joi");

module.exports = {
    updateOrder:Joi.object({
        order_status: Joi.string().required().empty().messages({
            "string.base": `Order_status should be a type of 'text'`,
            "string.empty": `Order_status should be an empty field`,
            "any.required": `Order_status is a required field`,
        }),
    }),
    updateOrderId:Joi.object({
        id: Joi.number().empty().required().messages({
            "number.base": `Id should be a type of number`,
            "number.empty": "Id  is not allowed to be empty",
            "any.required": `Id is Required`,
        })
    }),
    orderHistoryId:Joi.object({
        order_id: Joi.number().empty().required().messages({
            "number.base": `Order_id should be a type of number`,
            "number.empty": "Order_id  is not allowed to be empty",
            "any.required": `Order_id is Required`,
        })
    })
};