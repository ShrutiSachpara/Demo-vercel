const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "app/public/uploads");
    },
    filename: function (req, file, cb) {
      let extArray = file.mimetype.split("/");
      let extension = extArray[extArray.length - 1];
        cb(null, file.fieldname + "-" + Date.now()+ '.'+extension);
    },
});
const upload = multer({
  storage: storage
}).single('image');

const multipleUpload = multer({
  storage: storage
}).array('multipleImage', 10);

const videoUpload = multer({
  storage: storage
}).any();

module.exports = {
  upload, multipleUpload, videoUpload
};