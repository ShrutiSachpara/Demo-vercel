module.exports = (sequelize, Sequelize) => {
  const billAddress = sequelize.define(
    "bill_address",
    {
      id: {
        type: Sequelize.BIGINT(11),
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      full_name: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      mobile_no: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      alternate_mobile: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      address_line_1: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      address_line_2: {
        type: Sequelize.TEXT,
      },
      city: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      state: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      pinCode: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      place: {
        type: Sequelize.STRING(10),
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
  billAddress.associate = function (models) {
    billAddress.hasMany(models.order, { foreignKey: "address_id" });
  };
  return billAddress;
};
