const db = require("../../model/sequelize");
const wishlistModel = db.wishlist;
const productModel = db.product;
const productImageModel = db.product_image;

const addWishlist = (data) => {
  try {
    return wishlistModel.create(data);
  } catch (err) {
    throw err
  }
};

const deleteWishlist = (id) => {
  try {
    return wishlistModel.destroy({ where: { id } });
  } catch (err) {
    throw err
  }
};
const viewWishlist = (id) => {
  try {
    return wishlistModel.findAll({
      attributes: ["id"],
      where: { user_id: id },
      include: [
        {
          model: productModel,
          attributes: ["id","product_name", "product_price"],
          include: [
            {
              model: productImageModel,
              attributes: ["id", "images"],
            },
          ],
        },
      ],
    });
  } catch (err) {
    throw err
  }
};

module.exports = {
  addWishlist,
  deleteWishlist,
  viewWishlist,
};
