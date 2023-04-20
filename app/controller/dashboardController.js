const { GeneralResponse } = require("../utils/response");
const { GeneralError } = require("../utils/error");
const catchAsync = require("../utils/catchAsync");
const moment = require("moment");
const { Op } = require("sequelize");
const {
  dashboardControllerServices,
} = require("../serviceLayer/controllerService");
const {
  SUCCESSFULLY_VIEW_REPORTS,
  FAILED_TO_VIEW_REPORTS,
  DATA_ERROR,
  SUCCESSFULLY_ADD_CUSTOMERS,
  FAILED_TO_ADD_CUSTOMERS,
  SUCCESSFULLY_ADD_VENDOR,
  FAILED_TO_ADD_VENDOR,
  SUCCESSFULLY_COUNT_USERS,
  FAILED_TO_COUNT_USERS,
  SUCCESSFULLY_COUNT_DATA,
  FAILED_TO_COUNT_DATA
} = require("../utils/constants");

const vendorReport = catchAsync(async (req, res, next) => {
  try {
    const { startDate, endDate } = req.body;
    const search = {};

    if (startDate && endDate) {
      var date1 = moment(startDate).format("YYYY-MM-DD");
      var date2 = moment(endDate).format("YYYY-MM-DD");
      if (date1 && date2) {
        search.created_at = { [Op.between]: [date1, date2] };
      }
    }
    const venderReports = await dashboardControllerServices.vendorReports(
      search
    );
    if (venderReports) {
      next(new GeneralResponse(SUCCESSFULLY_VIEW_REPORTS, venderReports));
    } else {
      next(new GeneralError(FAILED_TO_VIEW_REPORTS));
    }
  } catch (err) {
    next(new GeneralError(DATA_ERROR));
  }
});

const customerReport = catchAsync(async (req, res, next) => {
  try {
    const { startDate, endDate } = req.body;
    const search = {};

    if (startDate && endDate) {
      var date1 = moment(startDate).format("YYYY-MM-DD");
      var date2 = moment(endDate).format("YYYY-MM-DD");
      if (date1 && date2) {
        search.created_at = { [Op.between]: [date1, date2] };
      }
    }
    const venderReports = await dashboardControllerServices.customerReports(
      search
    );
    if (venderReports) {
      next(new GeneralResponse(SUCCESSFULLY_VIEW_REPORTS, venderReports));
    } else {
      next(new GeneralError(FAILED_TO_VIEW_REPORTS));
    }
  } catch (err) {
    next(new GeneralError(DATA_ERROR));
  }
});

const adminReport = catchAsync(async (req, res, next) => {
  try {
   
    const { flag, order_status } = req.body;

    let reports = [];
    if (flag === 1) {
      reports = await dashboardControllerServices.approveVendor(order_status);
    } else if (flag === 2) {
      reports = await dashboardControllerServices.customerReports();
    } else if (flag === 3) {
      let data1, data2;
      data1 = await dashboardControllerServices.vendorReports();
      data2 = await dashboardControllerServices.customerReports();
      reports.push(data1, data2);
    }
    if (reports) {
      next(new GeneralResponse(SUCCESSFULLY_VIEW_REPORTS, reports));
    } else {
      next(new GeneralError(FAILED_TO_VIEW_REPORTS));
    }
  } catch (err) {
    next(new GeneralError(DATA_ERROR));
  }
});

const graphOfCustomers = catchAsync(async (req, res, next) => {
  try {
    const today = moment().format("YYYY-MM-DD");
    const otherDay = moment().subtract(30, "days").format("YYYY-MM-DD");

    const graphCustomers = await dashboardControllerServices.graphOfCustomers(
      today,
      otherDay
    );
    if (graphCustomers) {
      next(new GeneralResponse(SUCCESSFULLY_ADD_CUSTOMERS, graphCustomers));
    } else {
      next(new GeneralError(FAILED_TO_ADD_CUSTOMERS));
    }
  } catch (err) {
    next(new GeneralError(DATA_ERROR));
  }
});

const graphOfVendors = catchAsync(async (req, res, next) => {
  try {
    const today = moment().format("YYYY-MM-DD");
    const otherDay = moment().subtract(30, "days").format("YYYY-MM-DD");

    const graphVendors = await dashboardControllerServices.graphOfVendors(
      today,
      otherDay
    );
    if (graphVendors) {
      next(new GeneralResponse(SUCCESSFULLY_ADD_VENDOR, graphVendors));
    } else {
      next(new GeneralError(FAILED_TO_ADD_VENDOR));
    }
  } catch (err) {
    next(new GeneralError(DATA_ERROR));
  }
});

const countOfUsers = catchAsync(async (req, res, next) => {
  try {
    const { role } = req.body;
    const usersDetails = await dashboardControllerServices.countOfUsers(role);
    if (usersDetails) {
      next(new GeneralResponse(SUCCESSFULLY_COUNT_USERS, usersDetails));
    } else {
      next(new GeneralError(FAILED_TO_COUNT_USERS));
    }
  } catch (err) {
    next(new GeneralError(DATA_ERROR));
  }
});

const countOfData = catchAsync(async (req, res, next) => {
  try {
    const { user_id } = req.params;

    let result = [];
    const countOfCategory = await dashboardControllerServices.category(user_id);
    const countOfProduct = await dashboardControllerServices.product(user_id);

    result.push(countOfCategory, countOfProduct);
    if (result) {
      next(new GeneralResponse(SUCCESSFULLY_COUNT_DATA, result));
    } else {
      next(new GeneralError(FAILED_TO_COUNT_DATA));
    }
  } catch (err) {
    next(new GeneralError(DATA_ERROR));
  }
});

module.exports = {
  vendorReport,
  customerReport,
  adminReport,
  graphOfCustomers,
  graphOfVendors,
  countOfUsers,
  countOfData
};
