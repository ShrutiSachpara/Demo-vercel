const express = require("express");
const router = express();
const { orderHistoryController } = require('../../controller');
const { validator } = require("../../helper/validator");
const orderHistoryValidation = require('../../validation/orderHistoryValidation');

router.put('/api/updateOrderStatus/:id',validator.params(orderHistoryValidation.updateOrderId),
validator.body(orderHistoryValidation.updateOrder),orderHistoryController.updateHistory);
router.get('/api/orderHistory/:order_id',validator.params(orderHistoryValidation.orderHistoryId),orderHistoryController.orderHistory);

module.exports =router;