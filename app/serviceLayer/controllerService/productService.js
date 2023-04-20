const db = require("../../model/sequelize");
const productModel = db.product;
const productImageModel = db.product_image;

const addProduct = (data) => {
  try {
    return productModel.create(data);
  } catch (err) {
    throw err;
  }
};

const addProductImages = (data) => {
  try {
    return productImageModel.bulkCreate(data);
  } catch (err) {
    throw err;
  }
};
const updateProduct = (data, id) => {
  try {
    return productModel.update(data,{ where: { id } });
  } catch (err) {
    throw err;
  }
};

const listOfProduct = () => {
  try {
    return productModel.findAll({
      attributes: [
        "id",
        "product_name",
        "product_price",
        "description",
        "size",
        "quantity",
      ],
      where: { status: 1 },
      include: [
        {
          model: productImageModel,
          attributes: ["images"],
        },
      ],
    });
  } catch (err) {
    throw err;
  }
};

const product = (id) => {
  try {
    return productModel.findOne({
      attributes: [
        "id",
        "product_name",
        "product_price",
        "description",
        "size",
        "quantity",
      ],
      where: { id },
    });
  } catch (err) {
    throw err;
  }
};

const listOfProductByCategory = (id) => {
  try {
    return productModel.findAll({
      attributes: [
        "id",
        "product_name",
        "product_price",
        "description",
        "size",
        "quantity",
      ],
      where: { status: 1, category_id: id },
      include: [
        {
          model: productImageModel,
          attributes: ["images"],
        },
      ],
    });
  } catch (err) {
    throw err;
  }
};

const deleteProduct = (id) => {
  try {
    return productModel.update({ status: 0 }, { where: { id } });
  } catch (err) {
    throw err;
  }
};

module.exports = {
  addProduct,
  updateProduct,
  addProductImages,
  listOfProduct,
  listOfProductByCategory,
  deleteProduct,
  product
};
