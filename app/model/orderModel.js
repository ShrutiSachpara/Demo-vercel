module.exports = (sequelize, Sequelize) => {
  const order = sequelize.define(
    "order",
    {
      id: {
        type: Sequelize.BIGINT(11),
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.BIGINT(11),
        allowNull: false,
        references: {
          model: "user",
          key: "id",
        },
      },
      total_amount: {
        type: Sequelize.DECIMAL(11, 0),
        allowNull: false,
      },
      address_id: {
        type: Sequelize.BIGINT(11),
        allowNull: false,
        references: {
          model: "bill_address",
          key: "id",
        },
      },
      tax: {
        type: Sequelize.STRING(11),
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
      },
      updated_at: {
        type: Sequelize.DATE,
      },
      order_status: {
        type: Sequelize.STRING,
        enum: [
          "approved",
          "pending",
          "processing",
          "reject",
          "delivered",
          "processing",
          "success",
          "failed",
        ],
        allowNull: false,
      },
      status: {
        type: Sequelize.BOOLEAN(1),
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );
  order.associate = function (models) {
    order.hasMany(models.orderProduct, { foreignKey: "order_id" });
  };
  return order;
};
