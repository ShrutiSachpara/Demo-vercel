module.exports = (sequelize, Sequelize) => { 
     return sequelize.define("cart",
      {
        id: {
          type: Sequelize.BIGINT(11),
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        quantity: {
          type: Sequelize.BIGINT(11),
          allowNull: false,
        },
        product_id: {
          type: Sequelize.BIGINT(11),
          allowNull: false,
          references: {
            model: "product",
            key: "id",
          },
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
      })
  };