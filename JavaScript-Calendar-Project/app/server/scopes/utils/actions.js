const config = require("./config");
const configJSON = require("./config.json");
const fs = require("fs");
const time = new Date()
  .toISOString()
  .slice(0, -8)
  .replace(/-/g, ".")
  .replace(/T/g, "-")
  .replace(/:/g, ".");
const logFilePath = `${configJSON.eLog.filePath}eLog-${time}.log`;
console.log(logFilePath);

module.exports = {
  utils: function (str) {
    try {
      JSON.parse(str);
    } catch (e) {
      try {
        JSON.stringify(str);
      } catch (e) {
        return false;
      }
    }
    return true;
  },
  eLog: function (rawmsg) {
    let msg;
    switch (rawmsg.split(" ")[0].slice(1, -1)) {
      case "ERROR":
        msg = "\x1b[31m" + rawmsg + "\x1b[0m";
        break;
      case "WARN":
        msg = "\x1b[33m" + rawmsg + "\x1b[0m";
        break;
      case "FINE":
        msg = "\x1b[32m" + rawmsg + "\x1b[0m";
        break;
      case "STATUS":
        msg = "\x1b[34m" + rawmsg + "\x1b[0m";
        break;
      case "DEBUG":
        msg = "\x1b[35m" + rawmsg + "\x1b[0m";
        break;
      default:
        msg = "\x1b[37m" + rawmsg + "\x1b[0m";
    }
    if (configJSON.eLog.eLogEnabled) {
      let cLog = configJSON.eLog.cLogEnabled || process.env.ENV === "dev";
      if (configJSON.eLog.fLogEnabled) {
        try {
          if (!fs.existsSync(logFilePath)) {
            fs.writeFileSync(
              logFilePath,
              "===eLog Message Files - Consider Using the included SQLite database logging===\n",
              "utf8"
            );
          }
        } catch (err) {
          console.log("\x1b[31m[ERROR] [UTIL] Error creating eLog file\x1b[0m");
        }
        fs.appendFileSync(logFilePath, `${rawmsg}\n`, "utf8");
      }
      if (configJSON.eLog.dLogEnabled && configJSON.scopes.DATABASE) {
        const db = require("../DATABASE/actions");
        db.logMessage(rawmsg.split(" "));
      } else if (configJSON.eLog.dLogEnabled) {
        console.log(
          `"\x1b[33m[UTIL] eLog (DATABASE) is enabled but scope DATABASE is not\x1b[0m`
        );
        cLog = true;
      } else if (configJSON.scopes.DATABASE) {
        console.log(
          `"\x1b[33m[UTIL] scope DATABASE is enabled, consider using eLog (DATABASE)\x1b[0m`
        );
        cLog = true;
      }
      if (cLog) {
        console.log(msg);
      }
    } else {
      console.log(msg);
    }

    // if(configJSON.eLog.eLogEnabled) {
    //     switch(true) {
    //         case configJSON.eLog.cLogEnabled || process.env.ENV === 'dev':
    //             console.log(msg);
    //         case configJSON.eLog.fLogEnabled:
    //             try {
    //                 if (!fs.existsSync(logFilePath)) {
    //                     fs.writeFileSync(logFilePath, "===eLog Message Files - Consider Using the included SQLite database logging===\n", "utf8");
    //                 }
    //             } catch (err) {
    //             console.log("[UTIL] Error creating eLog file");
    //             }
    //             fs.appendFileSync(logFilePath, `${msg}\n`, "utf8");
    //         case (configJSON.eLog.dLogEnabled && configJSON.scopes.DATABASE && process.env.DATABASE_ENABLED):
    //             const db = require('../DATABASE/actions');
    //             db.logMessage(msg);
    //             break;
    //         // WHY IS THERE NO XOR OPERATOR ARGH
    //         case configJSON.eLog.dLogEnabled && ((configJSON.scopes.DATABASE && !process.env.DATABASE_ENABLED) || (!configJSON.scopes.DATABASE && process.env.DATABASE_ENABLED)):
    //             console.log(`[UTIL] eLog (DATABASE) is enabled but scope DATABASE is not.`);
    //             console.log(msg);
    //             break;
    //         case !configJSON.eLog.dLogEnabled && !(process.env.DATABASE_ENABLED && configJSON.scopes.DATABASE):
    //             console.log(`[UTIL] scope DATABSE is enabled, consider using eLog (DATABASE).`);
    //             console.log(msg);
    //             break;
    //         default:
    //             console.log(msg);
    //     }
    // } else {
    //     console.log(msg);
    // }

    // // if (configJSON.eLog.enabled && configJSON.scopes.DATABASE && configJSON.eLog.dLogEnabled) {
    // //     const db = require('../DATABASE/actions');
    // //     db.logMessage(msg);
    // // } else if (configJSON.eLog.enabled && configJSON.eLog.fLogEnabled) {
    // //     try {
    // //         if (!fs.existsSync(logFilePath)) {
    // //             fs.writeFileSync(logFilePath, "===eLog Message Files - Consider Using the included SQLite database logging===\n", "utf8");
    // //         }
    // //     } catch (err) {
    // //       console.log("[UTIL] Error creating eLog file");
    // //     }
    // //     fs.appendFileSync(logFilePath, `${msg}\n`, "utf8");
    // // } else {
    // //     console.log(msg);
    // //     cLog = false;
    // // }
    // // if (cLog || configJSON.eLog.cLogEnabled || process.env.ENV == "DEV") {
    // //     console.log(msg);
    // // }
  },
};
