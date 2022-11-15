const multer = require("multer");
exports.uploadDb = multer({ storage: storageDB, limits: { fileSize: 2097152 } });


var storageDB = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./");
  },
  filename: (req, file, cb) => {
    req.isValidFile = true;
    req.fileMessages = [];
    const fileName = file.originalname.replace(/\s+/g, "");
    let extenCount = fileName.split(".").length;
    if (extenCount !== 2) {
      req.isValidFile = false;
      req.fileMessages.push("Invalid File Name");
    }
    if (req.isValidFile) {
      cb(
        null,
        "file-" + Date.now() + "-" + fileName
      );
    } else {
      console.log("Upload failed");
      cb(
        null,
        "failed to upload"
      );
    }

  }
});

module.exports = exports;