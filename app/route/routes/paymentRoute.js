const express = require("express");
const router = express();
const { paymentController } = require("../../controller");

router.post('/api/payment/order',paymentController.paymentOrder);
router.post('/api/payment/verify',paymentController.paymentVerify);

module.exports = router;