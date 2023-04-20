module.exports = (sequelize, Sequelize) => {
  const wishlist = sequelize.define(
    "wishlist",
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
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );
  wishlist.associate = function (models) {
    wishlist.belongsTo(models.product, { foreignKey: "product_id" });
  };

  return wishlist;
};
