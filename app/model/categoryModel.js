module.exports = (sequelize, Sequelize) => {
  const category = sequelize.define(
    "category",
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
      name: {
        type: Sequelize.STRING(25),
        allowNull: false,
      },
      image: {
        type: Sequelize.STRING(50),
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      status: {
        type: Sequelize.BOOLEAN(1),
        defaultValue: true,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );

  category.associate = function (models) {
    category.hasMany(models.product, { foreignKey: "id" });
    models.product.belongsTo(models.category, { foreignKey: "category_id" });
  };
  return category;
};
