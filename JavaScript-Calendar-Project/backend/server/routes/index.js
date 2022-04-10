"use strict";

var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", (req, res, next) => {
  let params = {
    active: { home: true },
  };

  res.render("layouts/index", params);
});

router.get("/express_backend", (req, res, next) => {
  res.send({
    express: "Express Backend",
  });
});

module.exports = router;
