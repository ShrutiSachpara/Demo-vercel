const Sequelize = require("sequelize");
const logger = require("../logger/logger");
const dbName = require("../helper/database");
const {DATABASE_CONNECTION}=require("../utils/constants");
const sequelize = new Sequelize(dbName.DB, dbName.USER, dbName.PASSWORD, {
    host: dbName.HOST,
    dialect: dbName.DIALECT
})

sequelize
    .authenticate()
    .then(() => { logger.info(DATABASE_CONNECTION) })
    .catch((err) => {
        logger.error("err", err);
    })

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./userModel")(sequelize, Sequelize);
db.category = require("./categoryModel")(sequelize, Sequelize);
db.product =require("./productModel")(sequelize, Sequelize);
db.product_image= require("./productImageModel")(sequelize, Sequelize);
db.wishlist =require("./wishlistModel")(sequelize, Sequelize);
db.cart = require("./cartModel")(sequelize, Sequelize);
db.bill_address = require("./userAddressModel")(sequelize, Sequelize);
db.order = require("./orderModel")(sequelize, Sequelize);
db.orderProduct = require("./orderProductModel")(sequelize, Sequelize);
db.order_payment = require("./orderPaymentModel")(sequelize, Sequelize);
db.orderHistory = require("./orderHistoryModel")(sequelize, Sequelize);

db.sequelize.sync().then(() => {
    logger.info("yes is sync");
});

db.product.associate(db);
db.wishlist.associate(db);
db.user.associate(db);
db.bill_address.associate(db);
db.order.associate(db);
db.product.associate(db);
db.category.associate(db);

module.exports = db;
