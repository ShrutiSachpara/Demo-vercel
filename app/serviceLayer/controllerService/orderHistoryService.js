const db = require("../../model/sequelize");
const orderHistoryModel = db.orderHistory;
const orderModel = db.order;

const orderStatus = (data) => {
  try {
    return orderHistoryModel.create(data);
  } catch (err) {
    throw err;
  }
};

const updateStatus = (data, id) => {
  try {
    return orderModel.update({ order_status: data }, { where: { id } });
  } catch (err) {
    throw err;
  }
};

const deleteHistory = (id) => {
  try {
    return orderHistoryModel.update({ status: 0 }, { where: { order_id: id } });
  } catch (err) {
    throw err;
  }
};

const orderHistory =(id)=>{
  try{
    return orderHistoryModel.findAll({
      attributes:["id","order_status","timestamp","status"],
      where:{order_id:id}
    })
  }catch(err)
  {
    throw err;
  }
}

module.exports = {
  orderStatus,
  deleteHistory,
  updateStatus,
  orderHistory
};
