module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    "order_payment",
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
      order_id: {
        type: Sequelize.BIGINT(11),
        allowNull: false,
        references: {
          model: "order",
          key: "id",
        },
      },
      amount: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
      },
      payment_type: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
      },
      updated_at: {
        type: Sequelize.DATE,
      },
      status: {
        type: Sequelize.STRING,
        enum: ["confirm", "pending", "cancel"],
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );
};
