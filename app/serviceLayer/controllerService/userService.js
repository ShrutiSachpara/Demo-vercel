const db = require("../../model/sequelize");
const userModel = db.user;


const findEmail = (data) => {
    try {
        return userModel.findOne({
            attributes:["email"],
            where: data
        })
    } catch (err) {
        throw err;
    }
}

const createUser = (data) => {
    try {
        return userModel.create(data);
    }
    catch (err) {
        throw err;
    }
}

const getUser = (condition) => {
    try {
        return userModel.findAll({
            attributes: ["id", "email", "password", "role"],
            where: condition
        });
    }
    catch (err) {
        throw err;
    }
}

const getUserProfile = (condition) => {
    try {
        return userModel.findAll({
            attributes: ["id", "first_name", "last_name", "email", "mobile_no", "gender", "dob", "address", "city", "state", "zipCode"],
            where: condition
        });
    }
    catch (err) {
        throw err;
    }
}

const getEmail = (condition) => {
    try {
        return userModel.findAll({
            attributes: ["email"],
            where: condition
        });
    }
    catch (err) {
        throw err;
    }
}

const updateUserPassword = (updatePassword, condition) => {
    try {
        return userModel.update({ password: updatePassword }, { where: condition });
    }
    catch (err) {
        throw err;
    }
}

const editProfile = (data, condition) => {
    try {
      return userModel.update(data, { where: condition });
    } catch (err) {
      throw err;
    }
  };

module.exports = {
    getUser, createUser, getUserProfile, getEmail, updateUserPassword,
    editProfile , findEmail
}