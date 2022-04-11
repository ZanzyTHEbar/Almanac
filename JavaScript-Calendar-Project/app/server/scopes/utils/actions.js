const config = require("./config");
const configJSON = require("./config.json");
const fs = require("fs");
const logLevel = require("./logLevels");
const time = new Date()
  .toISOString()
  .slice(0, -8)
  .replace(/-/g, ".")
  .replace(/T/g, "-")
  .replace(/:/g, ".");
const logFilePath = `${configJSON.eLog.filePath}eLog-${time}.log`;

let LOGLEVEL = configJSON.eLog.level;
let CLOG = configJSON.eLog.cLogEnabled;
let DLOG = configJSON.eLog.dLogEnabled;
let ELOG = configJSON.eLog.eLogEnabled;
let FLOG = configJSON.eLog.fLogEnabled;
let DBENABLED = configJSON.scopes.DATABASE;
let DEVENV = config.NODE_ENV === "development";

const STYLE = {
  // Colors
  RED: "\x1b[31m",
  GREEN: "\x1b[32m",
  YELLOW: "\x1b[33m",
  BLUE: "\x1b[34m",
  PURPLE: "\x1b[35m",
  CYAN: "\x1b[36m",
  WHITE: "\x1b[37m",
  // Fonts
  BOLD: "\x1b[1m",
  UNDERLINE: "\x1b[4m",
  REVERSED: "\x1b[7m",
  // END
  END: "\x1b[0m",
};

module.exports = {
  utilInit: () => {
    eLog2(logLevel.INFO, "UTIL", "Initializing!");
    eLog2(logLevel.INFO, "UTIL", "Log level is set to: " + LOGLEVEL);
    if (DEVENV) {
      eLog2(
        logLevel.WARN,
        "UTIL",
        "Environment is set to development, log level will be overwritten"
      );
    }
    if (ELOG) {
      eLog2(
        logLevel.INFO,
        "UTIL",
        "Custom extending logging 'eLog2' is enabled"
      );
    }
    if (CLOG) {
      eLog2(logLevel.INFO, "UTIL", "Console logging is enabled");
    }
    if (DLOG) {
      eLog2(logLevel.INFO, "UTIL", "Database logging is enabled");
    }
    if (FLOG) {
      eLog2(logLevel.INFO, "UTIL", "File logging is enabled");
      eLog2(logLevel.INFO, "UTIL", "Log-file is saved in: " + logFilePath);
    }
  },
  checkJson: (str) => {
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
  disableLogBase: () => {
    eLog(logLevel.WARN, "UTIL", "Disabling logging database");
    DBENABLED = false;
  },
  eLog: (level, scope, rawmsg, forceConsole = false) => {
    eLog2(level, scope, rawmsg, forceConsole);
  },
  style: STYLE,
};

function eLog2(level, scope, rawmsg, forceConsole = false) {
  if (level.value < LOGLEVEL) return;
  let msg = getMSG(level, scope, rawmsg);

  if (ELOG) {
    let cLog = CLOG || DEVENV;
    if (FLOG) {
      try {
        if (!fs.existsSync(logFilePath)) {
          fs.writeFileSync(
            logFilePath,
            "===eLog Message Files - Consider Using the included SQLite database logging===\n",
            "utf8"
          );
        }
      } catch (err) {
        console.log(
          `${STYLE.RED}[ERROR] [UTIL] Error creating eLog file${STYLE.END}`
        );
      }
      fs.appendFileSync(logFilePath, `${msg.slice(5, -4)}\n`, "utf8");
    }
    if (DLOG && DBENABLED) {
      const db = require("../DATABASE/actions");
      db.logMessage(msg.slice(28, -4));
    } else if (DLOG) {
      console.log(
        `${STYLE.YELLOW}[UTIL] eLog (DATABASE) is enabled but scope DATABASE is not${STYLE.END}`
      );
      cLog = true;
    } else if (DBENABLED) {
      console.log(
        `${STYLE.YELLOW}[UTIL] scope DATABASE is enabled, consider using eLog (DATABASE)${STYLE.END}`
      );
      cLog = true;
    }
    if (cLog || forceConsole) {
      console.log(msg);
    }
  } else {
    console.log(msg);
  }
}

function getMSG(level, scope, rawmsg) {
  let logTime = new Date().toISOString().replace(/T/g, " ").slice(0, -1);
  switch (level) {
    case logLevel.ERROR:
      return `${STYLE.RED}${logTime} [${level.def}] [${scope}] ${rawmsg}${STYLE.END}`;
    case logLevel.WARN:
      return `${STYLE.YELLOW}${logTime} [${level.def}] [${scope}] ${rawmsg}${STYLE.END}`;
    case logLevel.STATUS:
      return `${STYLE.BLUE}${logTime} [${level.def}] [${scope}] ${rawmsg}${STYLE.END}`;
    case logLevel.INFO:
      return `${STYLE.WHITE}${logTime} [${level.def}] [${scope}] ${rawmsg}${STYLE.END}`;
    case logLevel.FINE:
      return `${STYLE.GREEN}${logTime} [${level.def}] [${scope}] ${rawmsg}${STYLE.END}`;
    case logLevel.DEBUG:
      return `${STYLE.PURPLE}${logTime} [${level.def}] [${scope}] ${rawmsg}${STYLE.END}`;
    default:
      return `${STYLE.CYAN}${logTime} [${level.def}] [${scope}] ${rawmsg} (UNSUPPORTED LEVEL)${STYLE.END}`;
  }
}
