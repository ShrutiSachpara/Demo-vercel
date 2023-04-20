const express = require("express");
const router = express();
const { userController } = require('../../controller');
const { validator } = require("../../helper/validator");
const userValidation = require('../../validation/userValidation');
const { authenticate } = require('../../helper/auth');

router.post("/registration", validator.body(userValidation.registration), userController.userRegistration);

router.post("/login", validator.body(userValidation.login), userController.userLogin);

router.put("/editProfile/:id", authenticate, validator.params(userValidation.idValidation), validator.body(userValidation.editProfile), userController.editProfile);

router.get("/viewProfile/:id",  authenticate, validator.params(userValidation.idValidation), userController.viewProfile);

router.post("/verifyEmail", validator.body(userValidation.verifyEmail), userController.verifyEmail);

router.post("/verifyOTP", validator.body(userValidation.verifyOTP), userController.verifyOTP);

router.put("/updatePassword", validator.body(userValidation.updatePassword), userController.updatePassword);

router.put("/resetPassword/:id", validator.params(userValidation.idValidation), validator.body(userValidation.resetPassword), userController.resetPassword);

module.exports = router;