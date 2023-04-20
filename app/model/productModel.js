const { category } = require("./sequelize");

module.exports = (sequelize, Sequelize) => {
  const product = sequelize.define(
    "product",
    {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: "user",
          key: "id",
        },
      },
      category_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: "category",
          key: "id",
        },
      },
      product_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      product_price: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      size: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
      },
      updated_at: {
        type: Sequelize.DATE,
      },
      status: {
        type: Sequelize.BOOLEAN(1),
        allowNull: false,
        defaultValue: 1,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );
  product.associate = function (models) {
    product.hasMany(models.product_image, { foreignKey: "product_id" });

    product.hasMany(models.cart, { foreignKey: "id" });
    models.cart.belongsTo(models.product, { foreignKey: "product_id" });

    product.hasMany(models.orderProduct, { foreignKey: "id" });
    models.orderProduct.belongsTo(models.product, { foreignKey: "product_id" });

    product.hasMany(models.product_image, { foreignKey: "product_id" });

  };
  return product;
};
