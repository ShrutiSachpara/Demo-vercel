const express = require("express");
const router = express();
const { productController } = require('../../controller');
const { validator } = require("../../helper/validator");
const productValidation = require('../../validation/productValidation');
const{multipleUpload}=require('../../helper/multer')

router.post("/api/addProduct",multipleUpload, validator.body(productValidation.addProduct), productController.addProduct);
router.put('/api/updateProduct/:id', validator.params(productValidation.idValidation), validator.body(productValidation.addProduct), productController.updateProduct);
router.get('/api/Product/:id', productController.productData);
router.get('/api/listOfProduct', productController.listOfProduct);
router.get('/api/listOfProductByCategory/:id', validator.params(productValidation.idValidation), productController.listOfProductByCategory);
router.delete('/api/deleteProduct/:id',validator.params(productValidation.idValidation),productController.deleteProduct)

module.exports = router;