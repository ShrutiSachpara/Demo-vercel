const db = require("../../model/sequelize");
const categoryModel = db.category;

const addCategory = (data) => {
  try {
    return categoryModel.create(data);
  } catch (err) {
    throw err;
  }
};

const listOfCategory = () => {
  try {
    return categoryModel.findAll();
  } catch (err) {
    throw err;
  }
};

const listOfCategoryById = (id) => {
  try {
    return categoryModel.findAll({ where: id });
  } catch (err) {
    throw err;
  }
};

const editCategory = (data,condition) => {
  try {
    return categoryModel.update(data, { where: condition });
  } catch (err) {
    throw err;
  }
};

const deleteCategory = (condition) => {
  try {
    return categoryModel.destroy({ where: condition }).catch((err)=>{
      console.log("err",err)
    });
  } catch (err) {
    throw err;
  }
};

module.exports = {
  addCategory,
  listOfCategory,
  listOfCategoryById,
  editCategory,
  deleteCategory
};
