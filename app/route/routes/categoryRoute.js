const express = require("express");
const router = express();
const { categoryController } = require('../../controller');
const { validator } = require("../../helper/validator");
const categoryValidation = require('../../validation/categoryValidation');
const { upload } = require('../../helper/multer');

router.post("/api/addCategory", upload, validator.body(categoryValidation.addCategory), categoryController.addCategory);

router.get("/api/listOfCategory", categoryController.listOfCategory);

router.get("/api/listOfCategoryById/:id", validator.params(categoryValidation.idValidation), categoryController.listOfCategoryById);

router.put("/api/editCategory/:id", upload, validator.params(categoryValidation.idValidation), validator.body(categoryValidation.addCategory), categoryController.editCategory);

router.delete("/api/deleteCategory/:id", validator.params(categoryValidation.idValidation), categoryController.deleteCategory);

router.post("/api/test/imageUpload",upload,categoryController.imageUpload);
router.post("/api/test/addCategory", upload, validator.body(categoryValidation.testCategory), categoryController.testCategory);

module.exports = router;