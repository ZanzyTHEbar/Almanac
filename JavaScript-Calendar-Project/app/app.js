"use strict";

const config = require("./config");
/* const middleware = require("./middleware"); */
const session = require("express-session");
const flash = require("connect-flash");
const msal = require("@azure/msal-node");

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
const sqldbRouter = require("./routes/db");

var app = express();

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
app.use("/db", sqldbRouter);

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
