const db =require("../model/sequelize");
const { GeneralResponse } = require("../utils/response");
const { GeneralError } = require("../utils/error");
const catchAsync = require("../utils/catchAsync");
const { cartControllerServices } = require("../serviceLayer/controllerService");
const {
  NOT_ADD_DATA_ERROR,
  ADD_DATA_SUCCESSFULLY,
  FOREIGN_KEY_ERROR,
  DATA_ERROR,
  DATA_DELETE_SUCCESSFULLY,
  DATA_DELETE_ERROR,
  SUCCESSFULLY_VIEW_CART,
  FAILED_VIEW_ORDER,
  UPDATE_DATA_SUCCESSFULLY,
  DATA_NOT_UPDATE_ERROR,
} = require("../utils/constants");

const addToCart = catchAsync(async (req, res, next) => {
  try {
    const data =req.body
    const addCartDetails = await cartControllerServices.addToCart(data);
    if (addCartDetails) {
      next(
        new GeneralResponse(`Cart ${ADD_DATA_SUCCESSFULLY}`,undefined)
      );
    } else {
      next(new GeneralError(`Cart ${NOT_ADD_DATA_ERROR}`));
    }
  } catch (err) {
    if (err instanceof db.Sequelize.ForeignKeyConstraintError) {
      next(new GeneralError(`${FOREIGN_KEY_ERROR}`));
    } else {
      next(new GeneralError(DATA_ERROR));
    }
  }
});

const viewCart = catchAsync(async (req, res, next) => {
  try {
    const {user_id} = req.params;
    const viewCart = await cartControllerServices.viewCart(user_id);
    const total = [];
    const result = viewCart.map((item) => {
      item.totalAmount = item.quantity * item.product.product_price;
      total.push(item.totalAmount);
      const [data] = item.product.product_images;
      
      return {
        cart_id: item.id,
        user_id: item.user_id,
        product_id: item.product.id,
        product_name: item.product.product_name,
        product_image: data.images,
        quantity: item.quantity,
        product_price: item.product.product_price,
        subTotal: item.totalAmount,
      };
    });
    let sum = 0;
    total.map((data) => {
      return (sum += data);
    });
    const finalResponse = [result, { totalAmount: sum }];

    if (finalResponse) {
      next(
        new GeneralResponse(SUCCESSFULLY_VIEW_CART, finalResponse)
      );
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

const updateCart = catchAsync(async (req, res, next) => {
  try {
    const {id} = req.params;
    const {quantity} = req.body;

    const updateCart = await cartControllerServices.updateCart(id, quantity);

    const [result] = updateCart;
    if (result) {
      next(new GeneralResponse(`Cart ${UPDATE_DATA_SUCCESSFULLY}`, undefined));
    } else {
      next(new GeneralError(`Cart ${DATA_NOT_UPDATE_ERROR}`));
    }
  } catch (err) {
    if (err instanceof db.Sequelize.ForeignKeyConstraintError) {
      next(new GeneralError(`${FOREIGN_KEY_ERROR} ${error.fields}`));
    } else {
      next(new GeneralError(DATA_ERROR));
    }
  }
});

const deleteCart = catchAsync(async (req, res, next) => {
  try {
    const {id} = req.params;
    const deleteCart = await cartControllerServices.deleteCart(id);
    if (deleteCart) {
      next(
        new GeneralResponse(`Cart ${DATA_DELETE_SUCCESSFULLY}`,undefined)
      );
    } else {
      next(new GeneralError(`Cart ${DATA_DELETE_ERROR}`));
    }
  } catch (err) {
    next(new GeneralError(DATA_ERROR));
  }
});

module.exports = {
  addToCart,
  deleteCart,
  viewCart,
  updateCart,
};
