const express = require("express");
const router = express();
const { cartController } = require("../../controller");
const { validator } = require("../../helper/validator");
const cartValidation = require("../../validation/cartValidation");

router.post(
  "/api/addToCart",
  validator.body(cartValidation.cartValidation),
  cartController.addToCart
);

router.get("/api/viewCart/:user_id",validator.params(cartValidation.idValidation),cartController.viewCart);

router.delete(
  "/api/deleteCart/:id",
  validator.params(cartValidation.idDeleteValidation),
  cartController.deleteCart
);

router.put("/api/updateCart/:id",cartController.updateCart);

module.exports = router;
