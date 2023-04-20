const { GeneralResponse } = require("../utils/response");
const { GeneralError } = require("../utils/error");
const config = require("../utils/config");
const isEmpty = require('lodash').isEmpty;
const catchAsync = require("../utils/catchAsync");
const db = require("../model/sequelize");
const {
  wishlistControllerServices,
} = require("../serviceLayer/controllerService");
const {
  FOREIGN_KEY_ERROR,
  DATA_ERROR,
  ADD_DATA_SUCCESSFULLY,
  NOT_ADD_DATA_ERROR,
  DATA_DELETE_SUCCESSFULLY,
  DATA_DELETE_ERROR,
  DATA_NOT_FOUND_ERROR,
} = require("../utils/constants");

const addWishlist = catchAsync(async (req, res, next) => {
  try {
    const { userId, productId } = req.body;
    const wishlistData = {
      user_id: userId,
      product_id: productId,
    };
    const wishlist = await wishlistControllerServices.addWishlist(wishlistData);
    if (wishlist) {
      next(
        new GeneralResponse(
          `${ADD_DATA_SUCCESSFULLY}`,
          wishlist,
          config.HTTP_CREATED
        )
      );
    } else {
      next(
        new GeneralResponse(NOT_ADD_DATA_ERROR, undefined, config.HTTP_CREATED)
      );
    }
  } catch (error) {
    if (error instanceof db.Sequelize.ForeignKeyConstraintError) {
      next(new GeneralError(`${FOREIGN_KEY_ERROR} ${error.fields}`));
    } else {
      next(new GeneralError(DATA_ERROR));
    }
  }
});

const deleteWishlist = catchAsync(async (req, res, next) => {
  try {
    const dataDelete = await wishlistControllerServices.deleteWishlist(
      req.params.id
    );
    if (dataDelete) {
      next(
        new GeneralResponse(
          DATA_DELETE_SUCCESSFULLY,
          undefined,
          config.HTTP_CREATED
        )
      );
    } else {
      next(
        new GeneralResponse(DATA_DELETE_ERROR, undefined, config.HTTP_CREATED)
      );
    }
  } catch (error) {
    next(new GeneralError(DATA_ERROR));
  }
});

const viewWishlist = catchAsync(async (req, res, next) => {
  try {
    const wishlist = await wishlistControllerServices.viewWishlist(
      req.params.userId
    );
    if (!isEmpty(wishlist)) {
      next(new GeneralResponse(undefined, wishlist));
    } else {
      next(
        new GeneralResponse(DATA_NOT_FOUND_ERROR, wishlist, config.HTTP_CREATED)
      );
    }
  } catch (error) {
    next(new GeneralError(DATA_ERROR));
  }
});
module.exports = { addWishlist, deleteWishlist, viewWishlist };
