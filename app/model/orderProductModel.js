module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    "order_product",
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
      product_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: "product",
          key: "id",
        },
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
        defaultValue: true,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );
};
