const express = require("express");
const router = express();
const { orderController } = require('../../controller');
const { validator } = require("../../helper/validator");
const orderValidation = require('../../validation/orderValidation');

router.post('/api/addAddress',
validator.body(orderValidation.addAddress),
orderController.addAddress);

router.get('/api/viewAddress/:user_id',validator.params(orderValidation.idValidation),orderController.viewAddress);

router.post('/api/checkout',orderController.checkOut);

router.delete('/api/cancelOrder/:order_id/:id',validator.params(orderValidation.cancelOrder),orderController.cancelOrder);

router.get('/api/viewOrder/:user_id',validator.params(orderValidation.idValidation),orderController.viewOrder);

router.post('/api/orderList/:user_id',validator.params(orderValidation.idValidation),orderController.orderList);

router.get('/api/orderListOfDetails/:user_id',validator.params(orderValidation.idValidation),orderController.orderListOfDetails);

module.exports =router;