module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    "order_history",
    {
      id: {
        type: Sequelize.BIGINT(11),
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      order_id: {
        type: Sequelize.BIGINT(11),
        allowNull: false,
        references: {
          model: "order",
          key: "id",
        },
      },
      timestamp: {
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
};
