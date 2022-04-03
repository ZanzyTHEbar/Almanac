const { newDB } = require("./dbms/data");
const { initLog, createLog } = require("./dbms/log");
const eLogPath = require("../utils/config.json").eLog.eLogPath;
const { eLog } = require(eLogPath);

module.exports = {
  useDB: function (name, tags) {
    eLog("[INFO] [DATA] Attempting to initialize new database...");
    return newDB(name, tags);
  },
  useLog: function () {
    eLog("[DEBUG] [DATA] Attempting to initialize logging database...");
    return initLog(logbase);
  },
  logMessage: function (msg) {
    // NO ELOG, IT WOULD LOG ITSELF
    createLog(msg);
    // console.log(`SEVERITY: ${msg[0]}, SCOPE: ${msg[1]}, MESSAGE: ${msg[2]}`);
  },
};
