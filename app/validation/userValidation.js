const Joi = require("@hapi/joi");
module.exports = {
  registration: Joi.object({
    first_name: Joi.string().required().empty().messages({
      "string.base": `First Name should be a type of 'text'`,
      "string.empty": `First Name cannot be an empty field`,
      "any.required": `First Name is a required field`,
    }),
    last_name: Joi.string().required().empty().messages({
      "string.base": `Last Name should be a type of 'text'`,
      "string.empty": `Last Name cannot be an empty field`,
      "any.required": `Last Name is a required field`,
    }),
    email: Joi.string().required().empty().email().messages({
      "string.base": `Email should be a type of 'email'`,
      "string.empty": `Email cannot be an empty field`,
      "string.email": `Email format not valid`,
      "any.required": `Email is a required field`,
    }),
    password: Joi.string().empty().required().messages({
      "string.base": `Password should be a type of 'number'`,
      "string.empty": `Password cannot be an empty field`,
      "any.required": `Password is a required field`,
    }),
    mobile_no: Joi.number()
      .integer()
      .min(1000000000)
      .max(9999999999)
      .required()
      .messages({
        "number.base": `Mobile number should be a type of 'number'`,
        "number.empty": `Mobile number cannot be an empty field`,
        "number.min": "Mobile number must be 10 digit",
        "number.max": "Mobile number can't be greater than 10 digit",
      }),
    gender: Joi.string()
      .empty()
      .required()
      .valid("male", "female", "other")
      .messages({
        "string.empty": `Gender cannot be an empty field`,
        "any.only": `Gender must be 'male', 'female', 'other'`,
        "string.gender": `Gender format not valid`,
        "any.required": `Gender is a required field`,
      }),
    dob: Joi.string().empty().required().messages({
      "string.empty": `DOB cannot be an empty field`,
      "string.DOB": `DOB format not valid`,
      "any.required": `DOB is a required field`,
    }),
    address: Joi.string().empty().required().messages({
      "string.empty": `Location cannot be an empty field`,
      "string.location": `Location format not valid`,
      "any.required": `Location is a required field`,
    }),
    city: Joi.string().empty().required().messages({
      "string.empty": `City cannot be an empty field`,
      "string.city": `City format not valid`,
      "any.required": `City is a required field`,
    }),
    state: Joi.string().empty().required().messages({
      "string.empty": `State cannot be an empty field`,
      "string.state": `State format not valid`,
      "any.required": `State is a required field`,
    }),
    zipCode: Joi.number().empty().required().messages({
      "number.empty": `Zip code cannot be an empty field`,
      "number.zipCode": `Zip code format not valid`,
      "any.required": `Zip code is a required field`,
    }),
    flag: Joi.number().empty().required().messages({
      "number.empty": `Flag cannot be an empty field`,
      "number.flag": `Flag format not valid`,
      "any.required": `Flag is a required field`,
    }),
  }),
  login: Joi.object({
    email: Joi.string().required().empty().email().messages({
      "string.base": `Email should be a type of 'email'`,
      "string.empty": `Email cannot be an empty field`,
      "string.email": `Email format not valid`,
      "any.required": `Email is a required field`,
    }),
    password: Joi.string().empty().required().messages({
      "string.base": `Password should be a type of 'number'`,
      "string.empty": `Password cannot be an empty field`,
      "any.required": `Password is a required field`,
    }),
  }),
  editProfile: Joi.object({
    first_name: Joi.string().required().empty().messages({
        "string.base": `First Name should be a type of 'text'`,
        "string.empty": `First Name cannot be an empty field`,
        "any.required": `First Name is a required field`,
    }),
    last_name: Joi.string().required().empty().messages({
        "string.base": `Last Name should be a type of 'text'`,
        "string.empty": `Last Name cannot be an empty field`,
        "any.required": `Last Name is a required field`,
    }),
    email: Joi.string().required().empty().email().messages({
        "string.base": `Email should be a type of 'email'`,
        "string.empty": `Email cannot be an empty field`,
        "string.email": `Email format not valid`,
        "any.required": `Email is a required field`,
    }),
    mobile_no: Joi.number().integer().min(1000000000).max(9999999999).required().messages({
        "number.base": `Mobile number should be a type of 'number'`,
        "number.empty": `Mobile number cannot be an empty field`,
        "number.min": "Mobile number must be 10 digit",
        "number.max": "Mobile number can't be greater than 10 digit",
    }),
    address: Joi.string().empty().required().messages({
        "string.empty": `Location cannot be an empty field`,
        "string.location": `Location format not valid`,
        "any.required": `Location is a required field`,
    }),
    city: Joi.string().empty().required().messages({
        "string.empty": `City cannot be an empty field`,
        "string.city": `City format not valid`,
        "any.required": `City is a required field`,
    }),
    state: Joi.string().empty().required().messages({
        "string.empty": `State cannot be an empty field`,
        "string.state": `State format not valid`,
        "any.required": `State is a required field`,
    }),
    zipCode: Joi.number().empty().required().messages({
        "number.empty": `Zip code cannot be an empty field`,
        "number.zipCode": `Zip code format not valid`,
        "any.required": `Zip code is a required field`,
    }),
}),
  idValidation: Joi.object({
    id: Joi.number().empty().required().messages({
      "number.base": `id should be a type of number`,
      "number.empty": "id  is not allowed to be empty",
      "number.required": `id is Required`,
    }),
  }),
  verifyEmail: Joi.object({
    email: Joi.string().required().empty().email().messages({
      "string.base": `Email should be a type of 'email'`,
      "string.empty": `Email cannot be an empty field`,
      "string.email": `Email format not valid`,
      "any.required": `Email is a required field`,
    }),
  }),
  verifyOTP: Joi.object({
    otp: Joi.number().required().empty().messages({
      "number.base": `Otp should be a type of 'number'`,
      "number.empty": `Otp cannot be an empty field`,
      "number.otp": `Otp format not valid`,
      "any.required": `Otp is a required field`,
    }),
  }),
  updatePassword: Joi.object({
    email: Joi.string().required().empty().email().messages({
      "string.base": `Email should be a type of 'text'`,
      "string.empty": `Email cannot be an empty field`,
      "string.email": `Email format not valid`,
      "any.required": `Email is a required field`,
    }),
    password: Joi.string().required().empty().min(6).max(16).messages({
      "string.base": `Password should be a type of 'text'`,
      "string.empty": `Password cannot be an empty field`,
      "string.min": "Password should be of minimum 6 characters",
      "string.max": "Password should be of maximum 16 characters",
      "any.required": `Password is a required field`,
    }),
    confirm_password: Joi.string()
      .required()
      .valid(Joi.ref("password"))
      .messages({
        "string.base": `Confirm password should be a type of 'text'`,
        "any.only": "Confirm password doesn't match",
        "any.required": `Confirm password is a required field`,
      }),
  }),
  resetPassword: Joi.object({
    current_password: Joi.string().empty().required().messages({
      "string.base": `Password should be a type of 'text'`,
      "string.empty": `Password cannot be an empty field`,
      "any.required": `Password is a required field`,
    }),
    password: Joi.string().required().empty().min(6).max(16).messages({
      "string.base": `Password should be a type of 'text'`,
      "string.empty": `Password cannot be an empty field`,
      "string.min": "Password should be of minimum 6 characters",
      "string.max": "Password should be of maximum 16 characters",
      "any.required": `Password is a required field`,
    }),
    confirm_password: Joi.string()
      .required()
      .valid(Joi.ref("password"))
      .messages({
        "string.base": `Confirm password should be a type of 'text'`,
        "any.only": "Confirm password doesn't match",
        "any.required": `Confirm password is a required field`,
      }),
  }),
};
