module.exports = (sequelize, Sequelize) => {
  const user = sequelize.define(
    "user",
    {
      id: {
        type: Sequelize.BIGINT(11),
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      first_name: {
        type: Sequelize.STRING(25),
        allowNull: false,
      },
      last_name: {
        type: Sequelize.STRING(25),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(50),
        unique: true,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      mobile_no: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      gender: {
        type: Sequelize.STRING,
        enum: ["male", "female", "other"],
        allowNull: false,
      },
      dob: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      address: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      city: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      state: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      zipCode: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      role: {
        type: Sequelize.STRING,
        enum: ["Customer", "Vendor", "Admin"],
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
        defaultValue: 1,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );
  user.associate = function (models) {
    user.hasMany(models.cart, { foreignKey: "user_id" });
    user.hasMany(models.order, { foreignKey: "user_id" });
    user.hasMany(models.category,{foreignKey: "user_id"});
    user.hasMany(models.product,{foreignKey:"user_id"})
  };
  return user;
};
