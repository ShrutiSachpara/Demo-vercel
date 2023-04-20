const { GeneralResponse } = require("../utils/response");
const { GeneralError } = require("../utils/error");
const catchAsync = require("../utils/catchAsync");
const db = require("../model/sequelize");
const isEmpty = require("lodash").isEmpty;
const {
  categoryControllerServices,
} = require("../serviceLayer/controllerService");
const {
  NOT_ADD_DATA_ERROR,
  ADD_DATA_SUCCESSFULLY,
  NO_SELECTED_FILE_ERROR,
  DATA_ERROR,
  FOREIGN_KEY_ERROR,
  DATA_NOT_FOUND_ERROR,
  UPDATE_DATA_SUCCESSFULLY,
  DATA_NOT_UPDATE_ERROR,
  DATA_DELETE_SUCCESSFULLY,
  DATA_DELETE_ERROR,
  IMAGE_UPLOADED_SUCCESSFULLY,
  FAILED_IMAGE_UPLOADED,
} = require("../utils/constants");

const addCategory = catchAsync(async (req, res, next) => {
  try {
    const data = req.body;
    if (req.file) {
      data.image = req.file.filename;
    }
    const categoryAdded = await categoryControllerServices.addCategory(data);

    if (categoryAdded) {
      next(
        new GeneralResponse(`Category ${ADD_DATA_SUCCESSFULLY}`, categoryAdded)
      );
    } else {
      next(new GeneralError(`Category ${NOT_ADD_DATA_ERROR}`));
    }
  } catch (error) {
    if (error instanceof db.Sequelize.ForeignKeyConstraintError) {
      next(new GeneralError(`${FOREIGN_KEY_ERROR} ${error.fields}`));
    } else {
      next(new GeneralError(DATA_ERROR));
    }
  }
});

const listOfCategory = catchAsync(async (req, res, next) => {
  try {
    const categoryList = await categoryControllerServices.listOfCategory();
    if (!isEmpty(categoryList)) {
      next(new GeneralResponse(undefined, categoryList));
    } else {
      next(new GeneralResponse(DATA_NOT_FOUND_ERROR, undefined));
    }
  } catch (error) {
    next(new GeneralError(DATA_ERROR));
  }
});

const listOfCategoryById = catchAsync(async (req, res, next) => {
  try {
    const { id } = req.params;
    const condition = { id };
    const categoryListById =
      await categoryControllerServices.listOfCategoryById(condition);
    if (!isEmpty(categoryListById)) {
      next(new GeneralResponse(undefined, categoryListById));
    } else {
      next(new GeneralResponse(DATA_NOT_FOUND_ERROR, undefined));
    }
  } catch (error) {
    next(new GeneralError(DATA_ERROR));
  }
});

const editCategory = catchAsync(async (req, res, next) => {
  try {
    const { id } = req.params;
    const condition = { id };
    if (!req.file) {
      next(new GeneralError(NO_SELECTED_FILE_ERROR, undefined));
    } else {
      req.body.image = req.file.filename;
      const categoryAdded = await categoryControllerServices.editCategory(
        req.body,
        condition
      );
      if (categoryAdded) {
        next(
          new GeneralResponse(`Category ${UPDATE_DATA_SUCCESSFULLY}`, undefined)
        );
      } else {
        next(new GeneralError(`Category ${DATA_NOT_UPDATE_ERROR}`));
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

const deleteCategory = catchAsync(async (req, res, next) => {
  try {
    const { id } = req.params;
    const condition = { id };
    const deleteCategory = await categoryControllerServices.deleteCategory(
      condition
    );
    console.log("deleteCategory",deleteCategory)
    if (deleteCategory) {
      next(
        new GeneralResponse(`Category ${DATA_DELETE_SUCCESSFULLY}`, undefined)
      );
    } else {
      next(new GeneralResponse(`Category ${DATA_DELETE_ERROR}`, undefined));
    }
  } catch (error) {
    next(new GeneralError(DATA_ERROR));
  }
});

const imageUpload = catchAsync(async (req, res, next) => {
  try {
    const image = req.file.filename;
    if (image) {
      next(new GeneralResponse(IMAGE_UPLOADED_SUCCESSFULLY, image));
    } else {
      next(new GeneralError(FAILED_IMAGE_UPLOADED, undefined));
    }
  } catch (error) {
    next(new GeneralError(DATA_ERROR));
  }
});

const testCategory = catchAsync(async (req, res, next) => {
  try {
    const data = req.body;
    const categoryAdded = await categoryControllerServices.addCategory(data);
    if (categoryAdded) {
      next(new GeneralResponse(`Category ${ADD_DATA_SUCCESSFULLY}`, categoryAdded));
    } else {
      next(new GeneralError(`Category ${NOT_ADD_DATA_ERROR}`));
    }
  } catch (error) {
    next(new GeneralError(DATA_ERROR));
  }
});

module.exports = {
  addCategory,
  listOfCategory,
  listOfCategoryById,
  editCategory,
  deleteCategory,
  imageUpload,
  testCategory
};
