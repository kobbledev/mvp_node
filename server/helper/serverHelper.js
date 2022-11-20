const fs = require("fs");
const moment = require("moment");
const path = require("path");

exports.logWriter = function (data, filename, folderName, append) {
    if (typeof data === "object") {
      data = JSON.stringify(data);
    }
    let logPath = createLogFolder(folderName);
    logPath = logPath + filename + ".log";
    if (append) {
      var newData = "\n" + data;
      fs.appendFile(logPath, newData, function () {});
    } else {
      fs.writeFileSync(logPath, data);
    }
};

function createLogFolder(folderName) {
    var currentDate = moment().format("DD-MM-YYYY");
    var currentHr = moment().format("HH");
    var logPathDir = path.join(__dirname, "../../../venue_logs");
    if (!fs.existsSync(logPathDir)) {
      fs.mkdirSync(logPathDir);
    }
    logPathDir = path.join(logPathDir + "/" + currentDate);
    if (!fs.existsSync(logPathDir)) {
      fs.mkdirSync(logPathDir);
    }
    logPathDir = path.join(logPathDir + "/" + currentHr);
    if (!fs.existsSync(logPathDir)) {
      fs.mkdirSync(logPathDir);
    }
    logPathDir = path.join(logPathDir + "/" + folderName);
    if (!fs.existsSync(logPathDir)) {
      fs.mkdirSync(logPathDir);
    }
    return logPathDir + "/";
}
module.exports = exports;
  