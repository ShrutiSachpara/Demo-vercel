/**
 * Convention:
 * 1. Camel case
 * 2. Uppercase
 * 3. Ends with "ERROR"
 */
//DATABASE

// EMAIL ERRORS
module.exports.NO_EMAIL_OR_PHONE_ERROR =
  "Either email or phone number is required.";
module.exports.INVALID_EMAIL_ERROR = "Invalid email";
module.exports.INCORRECT_EMAIL_OR_PASSWORD_ERROR =
  "Incorrect email or password.";
module.exports.INCORRECT_EMAIL_ERROR = "Incorrect email.";
module.exports.EMAIL_ALREADY_REGISTERED_ERROR =
  "This email is already registered.";
module.exports.EMAIL_ALREADY_SIGNED_UP_ERROR =
  "Email address already signed up!";
module.exports.EMAIL_PARTIAL_SIGNED_UP_ERROR =
  "You are partially registered with this email address. Please press Login, enter this email address and complete your registration.";
module.exports.EMAIL_ALREADY_TAKEN_ERROR = "Email already taken.";

// Zip Code ERRORS
module.exports.NO_ZIP_ERROR =
  "A Zip Code must be entered. If entered, please re-enter and press enter.";
module.exports.REGEX_ZIP_ERROR = "Zip code must be in the format of 12345-1234";
module.exports.DEFAULT_ZIP_ERROR = "Something Went Wrong";
module.exports.INCORRECT_ZIP_ERROR = "Please enter a correct zip code.";
module.exports.PRIMARY_DUPLICATE_ZIP_ERROR =
  "Primary Zip Code is not allowed as an additional Zip Code.";
module.exports.INCORRECT_MULTIPLE_ZIP_ERROR =
  "Please enter correct zip code(s).";

// Date/Time ERRORS
module.exports.EMPTY_DATE_TIME_ERROR = "Please enter valid date and time.";
module.exports.EMPTY_DATE_TIME_TABLE_ERROR = "Please add at least 1 event";
module.exports.EMPTY_DATE_TABLE_ERROR =
  "Date field is not allowed to be empty if time is entered.";
module.exports.END_DATE_BEFORE_START_DATE_ERROR =
  "End date cannot be before start date of event.";
module.exports.INVALID_TIME_ERROR = "Please enter valid time.";
module.exports.DATES_REQUIRED_ERROR = `Dates are required.`;
module.exports.INVALID_WEEKLY_OR_COUPON_EXPIRATION_TIME_ERROR =
  "Expiration date cannot be before today's date";

// General ERRORS (GET, CREATE, UPDATE, DELETE)
module.exports.GET_OPERATION_ERROR = "Failed to do GET operation.";
module.exports.GET_RELATED_POSTS_ERROR = "Failed to GET Related Posts.";
module.exports.CREATE_OPERATION_ERROR = "Failed to do CREATE operation.";
module.exports.UPDATE_OPERATION_ERROR = "Failed to do UPDATE operation.";
module.exports.FAILED_OPERATION_ERROR = "Failed to perform operation.";

// Auth ERRORS
module.exports.PASSWORD_CONVENTION_ERROR =
  "Password must contain at least one letter and one number";
module.exports.PASSWORD_RESET_ERROR = "Password reset failed.";
module.exports.USER_NOT_FOUND_ERROR = "User not found.";
module.exports.AUTHENTICATION_ERROR = "Please authenticate.";
module.exports.INVALID_TOKEN_ERROR = "Invalid token type";
module.exports.TOKEN_NOT_FOUND_ERROR = "Token not found.";
module.exports.USER_WITH_EMAIL_NOT_FOUND_ERROR =
  "No users found with this email.";
module.exports.INCORRECT_OLD_PASSWORD_ERROR =
  "The old password you have entered is incorrect.";

// Miscellaneous ERRORS
module.exports.EMPTY_COLLECTION_NAME_ERROR = "Please enter name of collection.";
module.exports.COLLECTION_ALREADY_EXISTS_ERROR =
  "Collection with this name already exists.";
module.exports.EMPTY_JOB_DESCRIPTION_ERROR = "Job Description must be entered.";
module.exports.NO_PDF_JPG_ERROR = "One PDF/JPG flyer must be uploaded.";
module.exports.EMPTY_TEMPLATE_DATA_ERROR = "Template Data cannot be empty.";
module.exports.NO_SUBCATEGORY_ERROR = "Please select a sub-category.";
module.exports.NO_IMAGE_ERROR = "Image must be uploaded.";
module.exports.NO_CONTENT_ERROR = "Content must be added.";
module.exports.INCORRECT_TYPE_ERROR = "Type is incorrect.";
module.exports.ADVERTISEMENTS_CONSUMED_ERROR =
  "You have used all free ads for this quarter.";
module.exports.NOT_FOUND_ERROR = "Not found.";
module.exports.INCORRECT_MODEL_ERROR = "Please choose an appropriate Model.";
module.exports.NO_PHONE_OR_TYPE_ERROR =
  "Enter phone number and type or neither.";
module.exports.NO_LINK_OR_DESC_ERROR =
  "Enter both link and link description or neither.";
module.exports.NO_COMM_MODE_ERROR =
  "At least one mode of communication is required.";
module.exports.ALREADY_REFERRED_ERROR = "User already referred.";
module.exports.USER_NOT_IN_RANGE_ERROR = "No user found in range.";
module.exports.NOT_ENOUGH_POINTS_ERROR = "Not enough points.";
module.exports.NO_DESCRIPTION_ERROR = "Description must be entered.";
module.exports.EMPTY_WEEKLY_OR_COUPON_BOTTOM_ERROR =
  "Please select at least 1 option.";
module.exports.NO_REGISITERED_USER = "No user registered.";
module.exports.CLOSEST_FILTER_ERROR =
  "Please login or signup to use this filter.";
module.exports.VERIFICATION_CODE_ERROR =
  "Please enter a correct verification code.";
module.exports.EMAIL_ALREADY_EXISTS = "Email already registered.";
module.exports.NOT_ADD_DATA_ERROR = "Data Not Added";
module.exports.DATA_ERROR = "Please Try Again";
module.exports.UPDATE_DATA_SUCCESSFULLY = "Updated Successfully";
module.exports.DATA_NOT_UPDATE_ERROR = "Data Not Updated";
module.exports.DATA_NOT_FOUND_ERROR = "Data Not Found";
module.exports.DATA_DELETE_SUCCESSFULLY = "Data Delete Successfully";
module.exports.IMAGE_UPLOADED_SUCCESSFULLY = "Image uploaded successfully"
module.exports.FAILED_IMAGE_UPLOADED ="Please try again"
module.exports.DATA_DELETE_ERROR = "Data Not Deleted";
module.exports.VALIDATION_ERROR = "Validation Error";
module.exports.FOREIGN_KEY_ERROR =
  "Cannot add or update a child row: a foreign key constraint fails in";
module.exports.DATABASE_CONNECTION = "Database Connected....";

module.exports.NO_FILE_ERROR = "Please Add The Images";
module.exports.ADD_DATA_SUCCESSFULLY = "Added Successfully";
module.exports.DELETE_DATA = "Deleted Successfully";
module.exports.SUCCESSFULLY_ORDER_PLACE = "Place Order successfully";
module.exports.SUCCESSFULLY_VIEW_ORDER = "View Order successfully";
module.exports.FAILED_VIEW_ORDER = "Failed to viewOrder";
module.exports.FAILED_ORDER_PLACE = "Failed to Order";
module.exports.SUCCESSFULLY_VIEW_CART = "View Cart Successfully";
module.exports.FAILED_VIEW_ORDER = "Failed to ViewCart";
module.exports.SUCCESSFULLY_VIEW_ADDRESS = "View Address Successfully";
module.exports.FAILED_VIEW_ADDRESS = "Failed to View Address";
module.exports.CANCEL_ORDER_SUCCESSFULLY = "Cancel Order Successfully";
module.exports.FAILED_ORDER = "Failed To CancelOrder";
module.exports.NO_FILE_ERROR = 'Please Add The Images';
module.exports.ADD_DATA_SUCCESSFULLY  = 'Added Successfully';
module.exports.DELETE_DATA = 'Deleted Successfully';
module.exports.SUCCESSFULLY_ORDER_PLACE ='Place Order successfully';
module.exports.SUCCESSFULLY_VIEW_ORDER ='View Order successfully';
module.exports.FAILED_VIEW_ORDER ='Failed to viewOrder';
module.exports.FAILED_ORDER_PLACE ='Failed to Order';
module.exports.SUCCESSFULLY_VIEW_CART ='View Cart Successfully';
module.exports.FAILED_VIEW_ORDER ='Failed to ViewCart';
module.exports.SUCCESSFULLY_VIEW_ADDRESS ='View Address Successfully'
module.exports.FAILED_VIEW_ADDRESS='Failed to View Address';
module.exports.CANCEL_ORDER_SUCCESSFULLY='Cancel Order Successfully';
module.exports.FAILED_ORDER='Failed To CancelOrder'

module.exports.FAILED_TO_REGISTRATION = 'Failed to registration.';
module.exports.ALREADY_EMAIL = 'User already exist';
module.exports.SUCCESSFULLY_REGISTRATION = 'You have Registration successfully.';
module.exports.SUCCESSFULLY_LOGIN = 'You have login successfully.';
module.exports.INCORRECT_PASSWORD_ERROR = 'Incorrect password.';
module.exports.SUCCESSFULLY_VIEW_PROFILE = 'User profile view successfully.';
module.exports.FAILED_TO_VIEW_PROFILE = 'Failed to view profile.';
module.exports.SUCCESSFULLY_SENDED_OTP = 'OTP sended successfully.';
module.exports.ENTER_VALID_EMAIL = 'Please enter valid email.';
module.exports.OTP_MATCHED = 'Your OTP matched.';
module.exports.ENTER_VALID_OTP = 'Please enter valid OTP.';
module.exports.SUCCESSFULLY_UPDATE_PASSWORD = 'Your password has been update successfully.';
module.exports.FAILED_TO_UPDATE_PASSWORD = 'Failed to update your password.';
module.exports.DATA_ERROR = 'Please try again.';
module.exports.SUCCESSFULLY_RESET_PASSWORD = 'Your password has been Reset successfully';
module.exports.INCORRECT_CURRENT_PASSWORD = 'Current password is incorrect';

//Category
module.exports.ADD_DATA_SUCCESSFULLY = 'Added successfully';
module.exports.NOT_ADD_DATA_ERROR = 'Data Not Added.';
module.exports.NO_SELECTED_FILE_ERROR = 'Please select image.';
module.exports.FOREIGN_KEY_ERROR = 'Cannot add or update a child row: a foreign key constraint fails in.';
module.exports.DATA_NOT_FOUND_ERROR = 'Data Not Found.';
module.exports.UPDATE_DATA_SUCCESSFULLY = 'Updated Successfully';
module.exports.DATA_NOT_UPDATE_ERROR = 'Data Not Updated';
module.exports.DATA_DELETE_SUCCESSFULLY = 'Data Delete Successfully';
module.exports.DATA_DELETE_ERROR='Data Not Deleted';

module.exports.FAILED_TO_REGISTRATION = "Failed to registration.";
module.exports.SUCCESSFULLY_REGISTRATION =
  "You have Registration successfully.";
module.exports.SUCCESSFULLY_LOGIN = "You have login successfully.";
module.exports.INCORRECT_PASSWORD_ERROR = "Incorrect password.";
module.exports.SUCCESSFULLY_VIEW_PROFILE = "User profile view successfully.";
module.exports.FAILED_TO_VIEW_PROFILE = "Failed to view profile.";
module.exports.SUCCESSFULLY_SENDED_OTP = "OTP sended successfully.";
module.exports.ENTER_VALID_EMAIL = "Please enter valid email.";
module.exports.OTP_MATCHED = "Your OTP matched.";
module.exports.ENTER_VALID_OTP = "Please enter valid email.";
module.exports.SUCCESSFULLY_UPDATE_PASSWORD =
  "Your password has been update successfully.";
module.exports.FAILED_TO_UPDATE_PASSWORD = "Failed to update your password.";
module.exports.DATA_ERROR = "Please try again.";
module.exports.SUCCESSFULLY_VIEW_ORDER_LIST = "View OrderList Successfully";
module.exports.FAILED_VIEW_ORDER_LIST = "Failed to OrderList";
module.exports.SUCCESSFULLY_VIEW_REPORTS = "View report Successfully";
module.exports.FAILED_TO_VIEW_REPORTS = "Failed to View Report";
module.exports.SUCCESSFULLY_ADD_CUSTOMERS = "Customers Count Successfully";
module.exports.FAILED_TO_ADD_CUSTOMERS = "Failed to Customers Count";
module.exports.SUCCESSFULLY_ADD_VENDOR = "Vendors Count Successfully";
module.exports.FAILED_TO_ADD_VENDOR = "Failed to Vendors Count";
module.exports.SUCCESSFULLY_VIEW_HISTORY = "View Order's Status";
module.exports.FAILED_TO_VIEW_HISTORY = "Failed To View Order's Status";
module.exports.SUCCESSFULLY_COUNT_USERS = "Number of Users Successfully";
module.exports.FAILED_TO_COUNT_USERS = "Failed to Number Of Users";
module.exports.SUCCESSFULLY_PAYMENT = "Payment Successfully";
module.exports.FAILED_TO_PAYMENT = "Failed To Payment";
module.exports.SUCCESSFULLY_COUNT_DATA="Counted Data Successfully";
module.exports.FAILED_TO_COUNT_DATA="Failed to Count of Data";
module.exports.SUCCESS_PRODUCT_DATA="Product successfully";
