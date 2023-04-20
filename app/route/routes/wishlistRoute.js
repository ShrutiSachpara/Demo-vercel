const express = require("express");
const router = express();
const { wishlistController } = require('../../controller');
const { validator } = require("../../helper/validator");
const wishlistValidation = require('../../validation/wishlistValidation');


router.post("/api/addWishlist", validator.body(wishlistValidation.addWishlist), wishlistController.addWishlist);
router.delete('/api/deleteWishlist/:id', validator.params(wishlistValidation.idValidation), wishlistController.deleteWishlist);
router.get('/api/viewWishlist/:userId', validator.params(wishlistValidation.userIdValidation), wishlistController.viewWishlist);

module.exports = router;