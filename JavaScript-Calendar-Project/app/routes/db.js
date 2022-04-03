"use strict";

var express = require("express");
var router = express.Router();

//Configure the database
const dboperations = require("../data/dboperations");
const Calendar = require("../data/calendar");

/* GET home page. */
router.get("/", function (req, res, next) {
  if (!req.session.userId) {
    // Redirect unauthenticated requests to home page
    res.redirect("/");
  } else {
    let params = {
      active: { home: false },
    };
    res.render("dlna", params);
  }
});

/* GET home page. */
router.get("/get", function (req, res, next) {
  if (!req.session.userId) {
    // Redirect unauthenticated requests to home page
    res.redirect("/");
  } else {
    dboperations.getCalendar().then((result) => {
      res.json(result[0]);
    });
  }
});

module.exports = router;
