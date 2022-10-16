"use strict";

var express = require("express");
var router = express.Router();

/* GET animation. */
router.get("/", (req, res, next) => {
  if (!req.session.userId) {
    // Redirect unauthenticated requests to home page
    res.redirect("/");
  } else {
    let params = {
      active: { animation: true },
      layout: false,
    };
    res.render("anim/ripple", params);
  }
});

module.exports = router;
