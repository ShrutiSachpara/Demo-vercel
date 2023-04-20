const config = require("./config");

class GeneralResponse {
  constructor(message, result, statusCode = "", action) {
    this.message = message;
    this.statusCode = statusCode == "" ? config.HTTP_SUCCESS : statusCode;
    this.result = result;
    this.action = action == "" ? 1 : 0
  }
}

module.exports = {
  GeneralResponse,
};
