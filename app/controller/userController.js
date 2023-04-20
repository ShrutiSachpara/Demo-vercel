const { GeneralResponse } = require("../utils/response");
const { GeneralError } = require("../utils/error");
const catchAsync = require("../utils/catchAsync");
const db = require("../model/sequelize");
const bcrypt = require("bcrypt");
const isEmpty = require("lodash").isEmpty;
const saltRounds = 10;
const { generateToken } = require("../helper/auth");
const { OTPsend } = require("../helper/mail");
let otp = Math.floor(100000 + Math.random() * 900000);
const { userControllerServices } = require("../serviceLayer/controllerService");
const {
  SUCCESSFULLY_REGISTRATION,
  FAILED_TO_REGISTRATION,
  INCORRECT_EMAIL_ERROR,
  INCORRECT_PASSWORD_ERROR,
  SUCCESSFULLY_LOGIN,
  SUCCESSFULLY_VIEW_PROFILE,
  FAILED_TO_VIEW_PROFILE,
  SUCCESSFULLY_SENDED_OTP,
  ENTER_VALID_EMAIL,
  OTP_MATCHED,
  ENTER_VALID_OTP,
  SUCCESSFULLY_UPDATE_PASSWORD,
  FAILED_TO_UPDATE_PASSWORD,
  DATA_ERROR,
  EMAIL_ALREADY_TAKEN_ERROR,
  PASSWORD_RESET_ERROR,
  SUCCESSFULLY_RESET_PASSWORD,
  INCORRECT_CURRENT_PASSWORD,
  UPDATE_DATA_SUCCESSFULLY,
  DATA_NOT_UPDATE_ERROR,
  ALREADY_EMAIL
} = require("../utils/constants");
const fieldConstant = require("../utils/fieldConstant");

exports.userRegistration = catchAsync(async (req, res, next) => {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      mobile_no,
      gender,
      dob,
      address,
      city,
      state,
      zipCode,
      flag,
    } = req.body;
    let role;
    if (flag === 1) role = fieldConstant.ROLE_VENDER;
    else if (flag === 2) role = fieldConstant.ROLE_CUSTOMER;
    const encryptedPassword = await bcrypt.hash(password, saltRounds);
    const values = {
      first_name,
      last_name,
      email,
      password: encryptedPassword,
      mobile_no,
      gender,
      dob,
      address,
      city,
      state,
      zipCode,
      role,
    };

      const userData =  await userControllerServices.findEmail({email});

      if(userData == null) {
        const registeredData = await userControllerServices.createUser(values);
        if (registeredData) {
          next(new GeneralResponse(SUCCESSFULLY_REGISTRATION, undefined));
        } else {
          next(new GeneralError(FAILED_TO_REGISTRATION));
        }
      } else {
        next( new GeneralError(ALREADY_EMAIL));
      } 
    }
   catch (error) {
    if (error instanceof db.Sequelize.UniqueConstraintError) {
      next(new GeneralError(`${EMAIL_ALREADY_TAKEN_ERROR}`));
    } else {
      next(new GeneralError(DATA_ERROR));
    }
  }
});

exports.userLogin = catchAsync(async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const condition = { email };
    const response = await userControllerServices.getUser(condition);
    if (!isEmpty(response)) {
      const [dataValues] = response;
      const comparison = await bcrypt.compare(password, dataValues.password);
      if (comparison) {
        let token = generateToken(dataValues);
        next(
          new GeneralResponse(SUCCESSFULLY_LOGIN, { id: dataValues.id, token })
        );
      } else {
        next(new GeneralError(INCORRECT_PASSWORD_ERROR));
      }
    } else {
      next(new GeneralError(INCORRECT_EMAIL_ERROR));
    }
  } catch (err) {
    console.log("--->",err)
    next(new GeneralError(DATA_ERROR));
  }
});

exports.viewProfile = catchAsync(async (req, res, next) => {
  try {
    const { id } = req.params;
    const condition = { id };
    const user = await userControllerServices.getUserProfile(condition);
    if (!isEmpty(user)) {
      next(new GeneralResponse(SUCCESSFULLY_VIEW_PROFILE, user));
    } else {
      next(new GeneralError(FAILED_TO_VIEW_PROFILE));
    }
  } catch (err) {
    next(new GeneralError(DATA_ERROR));
  }
});

exports.verifyEmail = catchAsync(async (req, res, next) => {
  try {
    const { email } = req.body;
    const condition = { email };
    const userEmail = await userControllerServices.getEmail(condition);
    if (!isEmpty(userEmail)) {
      OTPsend(email, otp);
      next(new GeneralResponse(SUCCESSFULLY_SENDED_OTP, undefined));
    } else {
      next(new GeneralError(ENTER_VALID_EMAIL));
    }
  } catch (err) {
    next(new GeneralError(DATA_ERROR));
  }
});

exports.verifyOTP = catchAsync(async (req, res, next) => {
  try {
    if (otp == req.body.otp) {
      next(new GeneralResponse(OTP_MATCHED, undefined));
    } else {
      next(new GeneralError(ENTER_VALID_OTP));
    }
  } catch (err) {
    next(new GeneralError(DATA_ERROR));
  }
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const condition = { email };
    const userEmail = await userControllerServices.getEmail(condition);
    if (!isEmpty(userEmail)) {
      const encryptedPassword = await bcrypt.hash(password, saltRounds);
      const userPasswordUpdate =
        await userControllerServices.updateUserPassword(
          encryptedPassword,
          condition
        );
      const [dataValues] = userPasswordUpdate;
      if (dataValues) {
        next(new GeneralResponse(SUCCESSFULLY_UPDATE_PASSWORD, undefined));
      } else {
        next(new GeneralError(FAILED_TO_UPDATE_PASSWORD));
      }
    } else {
      next(new GeneralError(ENTER_VALID_EMAIL));
    }
  } catch (err) {
    if (error instanceof db.Sequelize.ForeignKeyConstraintError) {
      next(new GeneralError(`${FOREIGN_KEY_ERROR} ${error.fields}`));
    } else {
      next(new GeneralError(DATA_ERROR));
    }
  }
});

exports.resetPassword = async (req, res, next) => {
  try {
    const { current_password, password } = req.body;
    const { id } = req.params;
    const condition = { id };
    const userData = await userControllerServices.getUser(condition);
    if (!isEmpty(userData)) {
      const [dataValues] = userData;
      const comparison = await bcrypt.compare(
        current_password,
        dataValues.password
      );
      if (comparison) {
        const updatePassword = await bcrypt.hash(password, saltRounds);
        const userPasswordUpdate =
          await userControllerServices.updateUserPassword(
            updatePassword,
            condition
          );
        if (userPasswordUpdate) {
          next(new GeneralResponse(SUCCESSFULLY_RESET_PASSWORD));
        } else {
          next(new GeneralError(PASSWORD_RESET_ERROR));
        }
      } else {
        next(new GeneralError(INCORRECT_CURRENT_PASSWORD));
      }
    } else next(new GeneralError(ENTER_VALID_EMAIL));
  } catch (error) {
    if (error instanceof db.Sequelize.ForeignKeyConstraintError) {
      next(new GeneralError(`${PASSWORD_RESET_ERROR}`));
    } else {
      next(new GeneralError(DATA_ERROR));
    }
  }
};

exports.editProfile = catchAsync(async (req, res, next) => {
  try {
    const { id } = req.params;
    const condition = { id };
    const editedProfile = await userControllerServices.editProfile(
      req.body,
      condition
    );
    if (editedProfile) {
      next(
        new GeneralResponse(
          `User profile ${UPDATE_DATA_SUCCESSFULLY}`,
          undefined
        )
      );
    } else {
      next(new GeneralError(`User profile ${DATA_NOT_UPDATE_ERROR}`));
    }
  } catch (error) {
    if (error instanceof db.Sequelize.ForeignKeyConstraintError) {
      next(new GeneralError(`${FOREIGN_KEY_ERROR} ${error.fields}`));
    } else {
      next(new GeneralError(DATA_ERROR));
    }
  }
});

