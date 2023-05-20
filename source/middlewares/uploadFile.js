const multer = require('multer');
const CustomError = require('../utils/customError');

// CREATE A MULTER MIDDLEWARE FOR FILES HANDLING
const uploadFile = multer({
    limits : {
      fileSize : 3000000
    },
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
        cb(new CustomError(400, "BAD_REQUEST", "Please upload an image file only (png/jpg/jpeg)!"));
      }
  
      cb(undefined, true);
    }
});

module.exports = uploadFile;