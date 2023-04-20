const db = require("../../model/sequelize");
const { Op } = require("sequelize");
const orderModel = db.order;
const cartModel = db.cart;
const orderProductModel = db.orderProduct;
const billAddressModel = db.bill_address;
const userModel = db.user;
const productModel = db.product;
const categoryModel = db.category;


const addAddress = (data) => {
  try {
    return billAddressModel.create(data);
  } catch (err) {
    throw err;
  }
};

const viewAddress = (id) => {
  try {
    return billAddressModel.findAll({
      attributes:["id","full_name","mobile_no","alternate_mobile","address_line_1","address_line_2","city","state","pinCode","place","user_id"],
      where: { user_id: id },
    });
  } catch (err) {
    throw err;
  }
};

const checkout = (id) => {
  try {
    return userModel.findAll({
      attributes: ["id", "first_name", "email"],
      include: [
        {
          model: cartModel,
          attributes: ["id", "quantity", "product_id", "user_id"],
          where: { user_id: id },
          include: [
            {
              model: productModel,
              attributes: ["id", "product_price", "product_name", "quantity"],
            },
          ],
        },
      ],
    });
  } catch (err) {
    throw err;
  }
};

const orderPlace = (data) => {
  try {
    return orderModel.create(data);
  } catch (err) {
    throw err;
  }
};

const addProduct = (data) => {
  try {
    return orderProductModel.bulkCreate(data);
  } catch (err) {
    throw err;
  }
};

const deleteProduct = (id) => {
  try {
    return orderProductModel.update({ status: 0 },{ where: { order_id:id } });
  } catch (err) {
    throw err;
  }
};

const cancelOrder = (id) => {
  try {
    return orderModel.update({ status: 0 },{ where: { id } });
  } catch (err) {
    throw err;
  }
};

const viewOrder = (id) => {
  try {
    return orderModel.findAll({
      attributes: ["id", "total_amount", "tax", "status"],
      where: { user_id: id },
      include: [
        {
          model: orderProductModel,
          attributes: ["product_id"],
          include: [
            {
              model: productModel,
              attributes: ["product_name", "product_price"],
            },
          ],
        },
      ],
    });
  } catch (err) {
    throw err;
  }
};

const oderList = (id,data) => {
  try {
    return userModel.findAll({
      attributes: [
        "id",
        "first_name",
        "last_name",
        "email",
        "mobile_no",
        "address",
        "city",
        "role"
      ],
      where: {
            id,
            role: data,
      },
    });
  } catch (err) {
    throw err;
  }
};

const orderListOfDetails = (id) => {
  return orderModel.findAll({
    attributes: ["id", "status"],
    where:{user_id:id},
    include: [
      {
        model: orderProductModel,
        attributes: ["id", "product_id"],
        include: [
          {
            model: productModel,
            attributes: ["id","product_name"],
            include: [
              {
                model: categoryModel,
                attributes: ["name", "image", "description"],
              },
            ],
          },
        ],
      },
    ],
  })
}

module.exports = {
  addAddress,
  viewAddress,
  checkout,
  orderPlace,
  addProduct,
  deleteProduct,
  cancelOrder,
  viewOrder,
  oderList,
  orderListOfDetails
};
