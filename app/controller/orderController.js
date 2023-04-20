const { GeneralResponse } = require("../utils/response");
const { GeneralError } = require("../utils/error");
const catchAsync = require("../utils/catchAsync");
const db = require("../model/sequelize");
const isEmpty = require("lodash").isEmpty;
const {
  orderControllerServices,
  orderHistoryControllerServices,
} = require("../serviceLayer/controllerService");
const {
  NOT_ADD_DATA_ERROR,
  ADD_DATA_SUCCESSFULLY,
  SUCCESSFULLY_ORDER_PLACE,
  DATA_ERROR,
  CANCEL_ORDER_SUCCESSFULLY,
  FAILED_ORDER_PLACE,
  FOREIGN_KEY_ERROR,
  SUCCESSFULLY_VIEW_ORDER,
  FAILED_VIEW_ORDER,
  SUCCESSFULLY_VIEW_ADDRESS,
  FAILED_VIEW_ADDRESS,
  FAILED_ORDER,
  SUCCESSFULLY_VIEW_ORDER_LIST,
  FAILED_VIEW_ORDER_LIST,
} = require("../utils/constants");
const fieldConstant = require("../utils/fieldConstant");

const addAddress = catchAsync(async (req, res, next) => {
  try {
    const addAddressDetails = await orderControllerServices.addAddress(
      req.body
    );
    if (addAddressDetails) {
      next(
        new GeneralResponse(
          `User Address ${ADD_DATA_SUCCESSFULLY}`,
          addAddressDetails
        )
      );
    } else {
      next(new GeneralError(`User Address ${NOT_ADD_DATA_ERROR}`));
    }
  } catch (err) {
    if (err instanceof db.Sequelize.ForeignKeyConstraintError) {
      next(new GeneralError(`${FOREIGN_KEY_ERROR}`));
    } else {
      next(new GeneralError(DATA_ERROR));
    }
  }
});

const viewAddress = catchAsync(async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const viewAddressDetails = await orderControllerServices.viewAddress(
      user_id
    );
    if (!isEmpty(viewAddressDetails)) {
      next(new GeneralResponse(SUCCESSFULLY_VIEW_ADDRESS, viewAddressDetails));
    } else {
      next(new GeneralError(FAILED_VIEW_ADDRESS));
    }
  } catch (err) {
    next(new GeneralError(DATA_ERROR));
  }
});

const checkOut = catchAsync(async (req, res, next) => {
  try {
    const { tax, user_id, address_id, flag, product_id } = req.body;
    let order_status;
    if (flag === 1) {
      order_status = fieldConstant.DELIVERED;
    } else if (flag === 0) {
      order_status = fieldConstant.PENDING;
    } else if (flag === 2) {
      order_status = fieldConstant.APPROVE;
    } else if (flag === 3) {
      order_status = fieldConstant.REJECT;
    } else if (flag === 4) {
      order_status = fieldConstant.PROCESSING;
    } else if (flag === 5) {
      order_status = fieldConstant.SUCCESS;
    } else if (flag === 6) {
      order_status = fieldConstant.FAILED;
    }

    const checkoutDetails = await orderControllerServices.checkout(user_id);
    const total = [];
    checkoutDetails.map((item) => {
      return item.carts.map((i) => {
        i.totalAmount = i.quantity * i.product.product_price;
        total.push(i.totalAmount);
      });
    });
    let sum = 0;
    total.map((data) => {
      return (sum += data);
    });
    var totalTax = (sum / 100) * tax;
    sum += totalTax;
    const orderData = {
      user_id: user_id,
      tax: totalTax,
      total_amount: sum,
      address_id: address_id,
      order_status: order_status,
    };

    const placeOrder = await orderControllerServices.orderPlace(orderData);
    if (placeOrder) {
      const values = {
        order_id: placeOrder.id,
        order_status: order_status,
      };
      const orderHistory = orderControllerServices.orderStatus(values);
      const data = product_id.map((item) => {
        return {
          product_id: item,
          order_id: placeOrder.id,
        };
      });
      const addProductDetails = orderControllerServices.addProduct(data);
      if (addProductDetails && orderHistory) {
        next(new GeneralResponse(SUCCESSFULLY_ORDER_PLACE, undefined));
      } else {
        next(new GeneralError(FAILED_ORDER_PLACE));
      }
    }
  } catch (err) {
    if (err instanceof db.Sequelize.ForeignKeyConstraintError) {
      next(new GeneralError(`${FOREIGN_KEY_ERROR}`));
    } else {
      next(new GeneralError(DATA_ERROR));
    }
  }
});

const viewOrder = catchAsync(async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const viewOrder = await orderControllerServices.viewOrder(user_id);
    if (!isEmpty(viewOrder)) {
      next(new GeneralResponse(SUCCESSFULLY_VIEW_ORDER, viewOrder));
    } else {
      next(new GeneralError(FAILED_VIEW_ORDER));
    }
  } catch (err) {
    if (err instanceof db.Sequelize.ForeignKeyConstraintError) {
      next(new GeneralError(`${FOREIGN_KEY_ERROR}`));
    } else {
      next(new GeneralError(DATA_ERROR));
    }
  }
});

const cancelOrder = catchAsync(async (req, res, next) => {
  try {
    const { order_id, id } = req.params;
    const deleteProduct = await orderControllerServices.deleteProduct(order_id);
    const deleteHistory = await orderHistoryControllerServices.deleteHistory(
      order_id
    );
    if (deleteProduct && deleteHistory) {
      const cancelOrder = await orderControllerServices.cancelOrder(id);
      if (cancelOrder) {
        next(new GeneralResponse(CANCEL_ORDER_SUCCESSFULLY, undefined));
      } else {
        next(new GeneralError(FAILED_ORDER));
      }
    }
  } catch (err) {
    if (err instanceof db.Sequelize.ForeignKeyConstraintError) {
      next(new GeneralError(`${FOREIGN_KEY_ERROR}`));
    } else {
      next(new GeneralError(DATA_ERROR));
    }
  }
});

const orderList = catchAsync(async (req, res, next) => {
  try {
    const { flag } = req.body;

    let role;
    if (flag === 1) {
      role = fieldConstant.ROLE_VENDER;
    } else if (flag === 2) {
      role = fieldConstant.ROLE_CUSTOMER;
    }
    const { user_id } = req.params;
    const orderList = await orderControllerServices.oderList(user_id, role);
    if (orderList) {
      next(new GeneralResponse(SUCCESSFULLY_VIEW_ORDER_LIST, orderList));
    } else {
      next(new GeneralError(FAILED_VIEW_ORDER_LIST));
    }
  } catch (err) {
    if (err instanceof db.Sequelize.ForeignKeyConstraintError) {
      next(new GeneralError(`${FOREIGN_KEY_ERROR}`));
    } else {
      next(new GeneralError(DATA_ERROR));
    }
  }
});

const orderListOfDetails = catchAsync(async (req, res, next) => {
  try {
    const {user_id} = req.params;
    const orderList = await orderControllerServices.orderListOfDetails(user_id);
    if (orderList) {
      next(new GeneralResponse(SUCCESSFULLY_VIEW_ORDER_LIST, orderList));
    } else {
      next(new GeneralError(FAILED_VIEW_ORDER_LIST));
    }
  } catch (err) {
    if (err instanceof db.Sequelize.ForeignKeyConstraintError) {
      next(new GeneralError(`${FOREIGN_KEY_ERROR}`));
    } else {
      next(new GeneralError(DATA_ERROR));
    }
  }
});

module.exports = {
  addAddress,
  viewAddress,
  checkOut,
  viewOrder,
  cancelOrder,
  orderList,
  orderListOfDetails
};
