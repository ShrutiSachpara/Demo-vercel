const crypto = require("crypto");
const Razorpay = require("razorpay");
const { GeneralResponse } = require("../utils/response");
const { GeneralError } = require("../utils/error");
const catchAsync = require("../utils/catchAsync");
const { SUCCESSFULLY_PAYMENT, FAILED_TO_PAYMENT,DATA_ERROR } = require("../utils/constants");

const paymentOrder = catchAsync(async (req, res, next) => {
  try {
    let instance = new Razorpay({
      key_id: "rzp_test_tKOSVAXb0JM15G", // your `KEY_ID`
      key_secret: "D4FDePRajZPEcv5u3bfLnv18", // your `KEY_SECRET`
    });
    params = req.body;
    instance.orders
      .create(params)
      .then((data) => {
        res.send({ sub: data, status: "success" });
      })
      .catch((error) => {
        res.send({ sub: error, status: "failed" });
      });
  } catch (err) {
    next(new GeneralError(DATA_ERROR));
  }
});

const paymentVerify = catchAsync(async (req, res, next) => {
  try {
    const {razorpay_order_id,razorpay_payment_id,razorpay_signature} =req.body;
    body = razorpay_order_id + "|" + razorpay_payment_id;
    
    const expectedSignature = crypto
      .createHmac("sha256", "D4FDePRajZPEcv5u3bfLnv18")
      .update(body.toString())
      .digest("hex");
    let response = { status: "failure" };
    if (expectedSignature === razorpay_signature)
      response = { status: "success" };
    if (response) {
      next(new GeneralResponse(SUCCESSFULLY_PAYMENT));
    } else {
      next(new GeneralError(FAILED_TO_PAYMENT));
    }
  } catch (err) {
    next(new GeneralError(DATA_ERROR));
  }
});

module.exports = {
  paymentOrder,
  paymentVerify,
};
