const express = require("express");
const router = express();

router.use('/', require('./routes/categoryRoute'));
router.use('/',require('./routes/cartRoute'));
router.use('/',require('./routes/orderRoute'));
router.use('/',require('./routes/productRoute'));
router.use('/', require('./routes/userRoute'));
router.use('/',require('./routes/orderHistoryRoute'));
router.use('/',require('./routes/dashboardRoute'));
router.use('/',require('./routes/paymentRoute'));
router.use('/',require('./routes/wishlistRoute'))

module.exports = router;