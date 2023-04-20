const Joi = require("@hapi/joi");

module.exports = {
    addAddress: Joi.object({

        full_name: Joi.string().required().empty().messages({
            "string.base": `FullName should be a type of 'text'`,
            "string.empty": `FullName should be an empty field`,
            "any.required": `FullName is a required field`,
        }),
        mobile_no: Joi.string().required().empty().messages({
            "string.base": `MobileNo should be a type of 'text'`,
            "string.empty": `MobileNo should be an empty field`,
            "any.required": `MobileNo is a required field`,
        }),
        alternate_mobile: Joi.string().required().empty().messages({
            "string.base": `AlternateMobile should be a type of 'text'`,
            "string.empty": `AlternateMobile should be an empty field`,
            "any.required": `AlternateMobile is a required field`,
        }),
        address_line_1: Joi.string().required().empty().messages({
            "string.base": `Address should be a type of 'text'`,
            "string.empty": `Address should be an empty field`,
            "any.required": `Address is a required field`,
        }),
        address_line_2: Joi.string().required().empty().messages({
            "string.base": `Address should be a type of 'text'`,
            "string.empty": `Address should be an empty field`,
            "any.required": `Address is a required field`,
        }),
        city: Joi.string().required().empty().messages({
            "string.base": `City should be a type of 'text'`,
            "string.empty": `City should be an empty field`,
            "any.required": `City is a required field`,
        }),
        state: Joi.string().required().empty().messages({
            "string.base": `State should be a type of 'text'`,
            "string.empty": `State should be an empty field`,
            "any.required": `State is a required field`,
        }),
        pinCode: Joi.string().required().empty().messages({
            "string.base": `PinCode should be a type of 'text'`,
            "string.empty": `PinCode should be an empty field`,
            "any.required": `PinCode is a required field`,
        }),
        place: Joi.string().required().empty().messages({
            "string.base": `Place should be a type of 'text'`,
            "string.empty": `Place should be an empty field`,
            "any.required": `Place is a required field`,
        }),
        user_id:Joi.number().empty().required().messages({
            "number.base": `User_id should be a type of number`,
            "number.empty": "User_id  is not allowed to be empty",
            "any.required": `User_id is Required`,
        })
    }),
    cancelOrder: Joi.object({
        order_id: Joi.number().empty().required().messages({
            "number.base": `Order_id should be a type of number`,
            "number.empty": "Order_id  is not allowed to be empty",
            "any.required": `Order_id is Required`,
        }),
        id: Joi.number().empty().required().messages({
            "number.base": `Id should be a type of number`,
            "number.empty": "Id  is not allowed to be empty",
            "any.required": `Id is Required`,
        })
    }),
    idValidation: Joi.object({
        user_id: Joi.number().empty().required().messages({
            "number.base": `User_id should be a type of number`,
            "number.empty": "User_id  is not allowed to be empty",
            "any.required": `User_id is Required`,
        })
    }),
    updateOrder:Joi.object({
        status: Joi.string().required().empty().messages({
            "string.base": `Status should be a type of 'text'`,
            "string.empty": `Status should be an empty field`,
            "any.required": `Status is a required field`,
        }),
    }),
    updateOrderId:Joi.object({
        id: Joi.number().empty().required().messages({
            "number.base": `Id should be a type of number`,
            "number.empty": "Id  is not allowed to be empty",
            "any.required": `Id is Required`,
        })
    })

};