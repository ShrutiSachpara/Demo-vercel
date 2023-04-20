const { GeneralResponse } = require("../utils/response");
const { GeneralError } = require("../utils/error");
const config = require("../utils/config");
const isEmpty = require('lodash').isEmpty;
const catchAsync = require("../utils/catchAsync");
const db = require("../model/sequelize");
const {
  productControllerServices,
} = require("../serviceLayer/controllerService");
const {
  NO_FILE_ERROR,
  ADD_DATA_SUCCESSFULLY,
  DATA_ERROR,
  UPDATE_DATA_SUCCESSFULLY,
  NOT_ADD_DATA_ERROR,
  DATA_NOT_UPDATE_ERROR,
  DATA_NOT_FOUND_ERROR,
  DATA_DELETE_SUCCESSFULLY,
  DATA_DELETE_ERROR,
  FOREIGN_KEY_ERROR,
  SUCCESS_PRODUCT_DATA
} = require("../utils/constants");

const addProduct = catchAsync(async (req, res, next) => {
  try {
    if (!isEmpty(req.files)) {
      next(new GeneralError(NO_FILE_ERROR, undefined, config.HTTP_BAD_REQUEST));
    } else {
      const product = await productControllerServices.addProduct(req.body);

      if (product) {
        if (!isEmpty(req.files)) {
          const data = req.files.map((item) => {
            return {
              images: item.filename,
              product_id: product.id,
            };
          });
          productControllerServices.addProductImages(data);
        }
        next(
          new GeneralResponse(
            `${product.product_name} ${ADD_DATA_SUCCESSFULLY}`,
            product,
            config.HTTP_CREATED
          )
        );
      } else {
        next(new GeneralError(NOT_ADD_DATA_ERROR));
      }
    }
  } catch (error) {
    if (error instanceof db.Sequelize.ForeignKeyConstraintError) {
      next(new GeneralError(`${FOREIGN_KEY_ERROR} ${error.fields}`));
    } else {
      next(new GeneralError(DATA_ERROR));
    }
  }
});

const updateProduct = catchAsync(async (req, res, next) => {
  try {
    const editProduct = await productControllerServices.updateProduct(
      req.body,
      req.params.id
    );
    const [updateProductData] = editProduct;
    if (updateProductData > 0) {
      next(
        new GeneralResponse(
          `Product ${UPDATE_DATA_SUCCESSFULLY}`,
          editProduct,
          config.HTTP_CREATED
        )
      );
    } else {
      next(new GeneralError(DATA_NOT_UPDATE_ERROR));
    }
  } catch (error) {
    if (error instanceof db.Sequelize.ForeignKeyConstraintError) {
      next(new GeneralError(`${FOREIGN_KEY_ERROR} ${error.fields}`));
    }
    next(new GeneralError(DATA_ERROR));
  }
});

const listOfProduct = catchAsync(async (req, res, next) => {
  try {
    const list = await productControllerServices.listOfProduct();
    if (!isEmpty(list)) {
      next(new GeneralResponse(undefined, list, config.HTTP_CREATED));
    } else {
      next(
        new GeneralResponse(
          DATA_NOT_FOUND_ERROR,
          undefined,
          config.HTTP_CREATED
        )
      );
    }
  } catch (error) {
    next(new GeneralError(DATA_ERROR));
  }
});

const productData = catchAsync(async (req, res, next) => {
  try {
    const list = await productControllerServices.product(req.params.id);
    if (!isEmpty(list)) {
      next(new GeneralResponse(SUCCESS_PRODUCT_DATA, list, config.HTTP_CREATED));
    } else {
      next(
        new GeneralResponse(
          DATA_NOT_FOUND_ERROR,
          undefined,
          config.HTTP_CREATED
        )
      );
    }
  } catch (error) {
    next(new GeneralError(DATA_ERROR));
  }
});

const listOfProductByCategory = catchAsync(async (req, res, next) => {
  try {
    const list = await productControllerServices.listOfProductByCategory(
      req.params.id
    );
    if (!isEmpty(list)) {
      next(new GeneralResponse(undefined, list, config.HTTP_CREATED));
    } else {
      next(
        new GeneralResponse(DATA_NOT_FOUND_ERROR, list, config.HTTP_CREATED)
      );
    }
  } catch (error) {
    next(new GeneralError(DATA_ERROR));
  }
});

const deleteProduct = catchAsync(async (req, res, next) => {
  try {
    const dataDelete = await productControllerServices.deleteProduct(
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

module.exports = {
  addProduct,
  updateProduct,
  listOfProduct,
  listOfProductByCategory,
  deleteProduct,
  productData
};
