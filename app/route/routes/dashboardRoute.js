const express = require("express");
const router = express();
const { dashboardController } = require('../../controller');
const { validator } = require("../../helper/validator");
const dashBoardValidation =require("../../validation/dashBoardValidation")

router.post("/api/vendorReport",validator.body(dashBoardValidation.vendorValidation),dashboardController.vendorReport);

router.post("/api/customerReport",validator.body(dashBoardValidation.customerValidation),dashboardController.customerReport);

router.post("/api/adminReport",validator.body(dashBoardValidation.adminValidation),dashboardController.adminReport);

router.get("/api/customerGraph",dashboardController.graphOfCustomers);

router.get("/api/vendorGraph",dashboardController.graphOfVendors);

router.post("/api/countOfUser",dashboardController.countOfUsers);

router.get("/api/countOfData/:user_id",validator.params(dashBoardValidation.idValidation),dashboardController.countOfData);

module.exports =router;