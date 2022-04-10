"use strict";

var express = require("express");
var router = express.Router();

/* GET animation. */
router.get("/", function (req, res, next) {
  if (!req.session.userId) {
    // Redirect unauthenticated requests to home page
    res.redirect("/");
  } else {
    let params = {
      active: { animation: true },
    };
    res.render("anim/anim", params);
  }
});

module.exports = router;
