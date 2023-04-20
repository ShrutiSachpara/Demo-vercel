const db = require("../../model/sequelize");
const cartModel = db.cart;
const productModel = db.product;
const productImageModel = db.product_image;

const addToCart = (data) => {
  try {
    return cartModel.create(data);
  } catch (err) {
    throw err;
  }
};

const viewCart = (id) => {
  try {
    return cartModel.findAll({
      attributes: ["id", "user_id", "quantity", "product_id"],
      where: { user_id: id },
      include: {
        model: productModel,
        attributes: ["id", "product_name", "product_price"],
        include: [
          {
            model: productImageModel,
            attributes: ["id", "images"],
          },
        ],
      },
    });
  } catch (err) {
    throw err;
  }
};

const updateCart = (id, data) => {
  try {
    return cartModel.update({ quantity: data }, { where: { id } });
  } catch (err) {
    throw err;
  }
};

const deleteCart = (id) => {
  try {
    return cartModel.destroy({
      where: { id },
    });
  } catch (err) {
    throw err;
  }
};

module.exports = {
  addToCart,
  deleteCart,
  viewCart,
  updateCart,
};
