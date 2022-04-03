"use strict";

const SCOPES = require("./scopes/utils/config.json").scopes;
const config = require("./scopes/utils/config");
const eLogPath = require("./scopes/utils/config.json").eLog.eLogPath;
const { eLog } = require(eLogPath);
/* const { addFunction } = require("./custom"); */
const session = require("express-session");
const flash = require("connect-flash");
const msal = require("@azure/msal-node");
const fs = require("fs");

// Initialize the app.
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

// Initialize the routers
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const calendarRouter = require("./routes/calendar");
const dlnaRouter = require("./routes/dlnaplayer");

var app = express();

eLog(`[INFO] [CORE] Initializing Application..`);
// In-memory storage of logged-in users
// For demo purposes only, production apps should store
// this in a reliable storage
app.locals.users = {};

// MSAL config
const msalConfig = {
  auth: {
    clientId: config.oauth.clientId,
    authority: config.oauth.authority,
    clientSecret: config.oauth.clientSecret,
  },
  system: {
    loggerOptions: {
      loggerCallback(loglevel, message, containsPii) {
        console.log(message);
      },
      piiLoggingEnabled: false,
      logLevel: msal.LogLevel.Verbose,
    },
  },
};

// Create msal application object
app.locals.msalClient = new msal.ConfidentialClientApplication(msalConfig);

// Session middleware
// NOTE: Uses default in-memory session store, which is not
// suitable for production

app.use(
  session({
    secret: config.oauth.clientSecret,
    resave: false,
    saveUninitialized: false,
    unset: "destroy",
  })
);

eLog("[STATUS] [CORE] Microsoft Graph API loaded");

// Flash middleware
app.use(flash());

// Set up local vars for template layout
app.use(function (req, res, next) {
  // Read any flashed errors and save
  // in the response locals
  res.locals.error = req.flash("error_msg");

  // Check for simple error string and
  // convert to layout's expected format
  var errs = req.flash("error");
  for (var i in errs) {
    res.locals.error.push({ message: "An error occurred", debug: errs[i] });
  }

  // Check for an authenticated user and load
  // into response locals
  if (req.session.userId) {
    res.locals.user = app.locals.users[req.session.userId];
  }

  next();
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

var hbs = require("hbs");
eLog("[STATUS] [CORE] Frontend loaded");
var parseISO = require("date-fns/parseISO");
var formatDate = require("date-fns/format");
// Helper to format date/time sent by Graph
hbs.registerHelper("eventDateTime", function (dateTime) {
  const date = parseISO(dateTime);
  return formatDate(date, "M/d/yy h:mm a");
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/dlna", dlnaRouter);
app.use("/calendar", calendarRouter);
app.use("/users", usersRouter);

function initCroutes(scope) {
  eLog(`[INFO] [CORE] ${scope} initializing croutes`);
  let changed = false;
  Object.keys(SCOPES)
    .filter((key) => SCOPES[key] && scope !== key)
    .forEach((key) => {
      try {
        fs.readdirSync(`./scopes/${scope}/croutes`)
          .filter((file) => file.startsWith(key))
          .forEach((file) => {
            eLog(`[WARN] [CORE] ${scope} found extra croutes for ${key}`);
            app.use(
              `/${scope.toLowerCase()}/${key.toLowerCase}`,
              require(`./scopes/${scope}/croutes/${file}`)
            );
            changed = true;
          });
      } catch (error) {
        eLog(`[INFO] [CORE] ${scope} did not need extra routes for ${key}`);
      }
    });
  eLog(
    changed
      ? `[FINE] [CORE] ${scope} croutes initialized`
      : `[INFO] [CORE] ${scope} did not need any croutes`
  );
}

// foreach scope, app.use the scope's router
for (const scope in SCOPES) {
  eLog(`[INFO] [CORE] ${scope} initializing`);
  if (config[scope.toUpperCase() + "_ENABLED"] && SCOPES[scope]) {
    const routes = require(`./scopes/${scope}/routes`);
    app.use(`/${scope.toLowerCase()}`, routes);
    eLog(`[DEBUG] [CORE] Adding extended Functions to ${scope}`);
    addFunction(scope, app);
    eLog(`[DEBUG] [CORE] Adding custom routes Functions to ${scope}`);
    initCroutes(scope);
    eLog(`[FINE] [CORE] ${scope} loaded!`);
  } else if (
    config[scope.toUpperCase() + "_ENABLED"] == null &&
    SCOPES[scope]
  ) {
    eLog(`[INFO] [CORE] Custom scope ${scope} found`);
    try {
      const routes = require(`./scopes/${scope}/routes`);
      app.use(`/${scope.toLowerCase()}`, routes);
      eLog(`[FINE] [CORE] ${scope} loaded`);
      eLog(`[DEBUG] [CORE] Adding extended Functions to ${scope}`);
      addFunction(scope, app);
      eLog(`[DEBUG] [CORE] Adding custom routes Functions to ${scope}`);
      initCroutes(scope);
    } catch {
      eLog(`[ERROR] [CORE] Loading of custom scope ${scope} failed`);
    }
  } else {
    eLog(`[WARN] [CORE] ${scope} not loaded`);
    eLog(`[WARN] [CORE] ${scope} either not enabled or not found`);
  }
}

eLog(`[STATUS] [CORE] Modules loaded`);
eLog("[STATUS] [CORE] Routers loaded");

eLog(`[INFO] [CORE] Application initialized!`);
eLog(`[INFO] [CORE] Starting Application...`);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
