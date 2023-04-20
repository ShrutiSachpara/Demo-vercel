const { GeneralResponse } = require("../utils/response");
const { GeneralError } = require("../utils/error");
const catchAsync = require("../utils/catchAsync");
const {
  orderHistoryControllerServices,
} = require("../serviceLayer/controllerService");
const {
  DATA_ERROR,
  UPDATE_DATA_SUCCESSFULLY,
  DATA_NOT_UPDATE_ERROR,
  SUCCESSFULLY_VIEW_HISTORY,
  FAILED_TO_VIEW_HISTORY,
} = require("../utils/constants");

const updateHistory = catchAsync(async (req, res, next) => {
  try {
    const { id } = req.params;
    const { order_status } = req.body;

    const updateStatus = await orderHistoryControllerServices.updateStatus(
      order_status,
      id
    );
    const [dataValues] = updateStatus;
    if (dataValues) {
      const data = {
        order_id: id,
        order_status: order_status,
      };
      const orderHistory = orderHistoryControllerServices.orderStatus(data);
      if (orderHistory)
        next(new GeneralResponse(UPDATE_DATA_SUCCESSFULLY, undefined));
    } else {
      next(new GeneralError(DATA_NOT_UPDATE_ERROR));
    }
  } catch (err) {
    next(new GeneralError(DATA_ERROR));
  }
});

const orderHistory = catchAsync(async (req, res, next) => {
  try {
    const { order_id } = req.params;
    const historyDetails = await orderHistoryControllerServices.orderHistory(
      order_id
    );
    if (historyDetails) {
      next(new GeneralResponse(SUCCESSFULLY_VIEW_HISTORY, historyDetails));
    } else {
      next(new GeneralError(FAILED_TO_VIEW_HISTORY));
    }
  } catch (err) {
    next(new GeneralError(DATA_ERROR));
  }
});

module.exports = {
  updateHistory,
  orderHistory,
};
