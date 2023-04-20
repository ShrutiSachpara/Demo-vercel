const db = require("../../model/sequelize");
const { Op } = require("sequelize");
const categoryModel = db.category;
const userModel = db.user;
const orderModel = db.order;
const orderProductModel = db.orderProduct;
const productModel = db.product;

const vendorReports = (data) => {
  try {
    return userModel.findAll({
      attributes: ["id", "first_name", "email", "role", "created_at"],
      where: {
        [Op.and]: [
          data,
          {
            role: "Vendor",
          },
        ],
      },
      include: {
        model: orderModel,
        attributes: ["id", "order_status", "total_amount"],
        include: {
          model: orderProductModel,
          attributes: ["id", "order_id"],
          include: {
            model: productModel,
            attributes: ["id", "product_name", "product_price"],
          },
        },
      },
    });
  } catch (err) {
    throw err;
  }
};

const customerReports = (data) => {
  try {
    return userModel.findAll({
      attributes: ["id", "first_name", "email", "role", "created_at"],
      where: {
        [Op.and]: [
          data,
          {
            role: "Customer",
          },
        ],
      },
      include: {
        model: orderModel,
        attributes: ["id", "order_status", "total_amount"],
        include: {
          model: orderProductModel,
          attributes: ["id"],
          include: {
            model: productModel,
            attributes: ["id", "product_name", "product_price"],
          },
        },
      },
    });
  } catch (err) {
    throw err;
  }
};

const adminReport = () => {
  try {
    return userModel.findAll();
  } catch (err) {
    throw err;
  }
};

const graphOfCustomers = (today, otherDay) => {
  try {
    return userModel.findAll({
      attributes: [
        "role",
        "created_at",
        [db.sequelize.fn("COUNT", db.Sequelize.col("id")), "count"],
      ],
      group: ['created_at'],
      where: {
        created_at: { [Op.between]: [otherDay, today] },
        role: "Customer",
      },
    });
  } catch (err) {
    throw err;
  }
};

const graphOfVendors = (today, otherDay) => {
  try {
    return userModel.findAll({
      attributes: [
        "role",
        "created_at",
        [db.sequelize.fn("COUNT", db.Sequelize.col("id")), "count"],
      ],
      group: ['created_at'],
      where: {
        created_at: { [Op.between]: [otherDay, today] },
        role: "Vendor",
      },
    });
  } catch (err) {
    throw err;
  }
};

const approveVendor = (data) => {
  try {
    return userModel.findAll({
      attributes: ["id", "first_name", "email", "role", "created_at"],
      where: {
        role: "Vendor",
      },
      include: {
        model: orderModel,
        attributes: ["id", "order_status", "total_amount"],
        where: { [Op.or]: [{ order_status: data }, { order_status: data }] },
        include: {
          model: orderProductModel,
          attributes: ["id", "order_id"],
          include: {
            model: productModel,
            attributes: ["id", "product_name", "product_price"],
          },
        },
      },
    });
  } catch (err) {
    throw err;
  }
};

const countOfUsers = (data) => {
  try {
    return userModel.findAll({
      attributes: [
        "role",
        [db.sequelize.fn("COUNT", db.Sequelize.col("id")), "USER"],
      ],
      where: { [Op.or]: [{ role: data }, { role: data }, { role: data }] },
    });
  } catch (err) {
    throw err;
  }
};

const category = (id) => {
  try {
    return userModel.findAll({
      attributes: ["id", "email"],
      where: {id},
      include: [
        {
          model: categoryModel,
          attributes: [
            "id",
            [db.sequelize.fn("COUNT", db.Sequelize.col("name")), "category"],
          ],
        },
      ],
    });
  } catch (err) {
    throw err;
  }
};

const product = (id) => {
  try {
    return userModel.findAll({
      attributes: ["id", "email"],
      where: {id},
      include: [
        {
          model: productModel,
          attributes: [
            "id",
            [
              db.sequelize.fn("COUNT", db.Sequelize.col("product_name")),
              "products",
            ],
          ],
        },
      ],
    });
  } catch (err) {
    throw err;
  }
};

module.exports = {
  customerReports,
  vendorReports,
  adminReport,
  graphOfCustomers,
  graphOfVendors,
  approveVendor,
  countOfUsers,
  category,
  product,
};
