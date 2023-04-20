const nodemailer = require("nodemailer");
const logger = require("../logger/logger");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  secure: false, //true
  port: 25, //465
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
});

const OTPsend = (Email, otp) => {
  let mailDetail = {
    to: Email,
    subject: "OTP for new Password",
    html:
      "<h3>Please click on given link to reset yout password </h3>" +
      "<h1 style='font-weight:bold;'>" +
      otp +
      "</h1>", // html body
  };
  transporter.sendMail(mailDetail, function (error, info) {
    if (error) {
      logger.error(error);
    } else {
      logger.info("Email sent: " + info.response);
    }
  });
};
module.exports = { OTPsend };
