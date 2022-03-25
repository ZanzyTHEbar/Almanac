"use strict";

var Browser = require("nodecast-js");
var express = require("express");
var router = express.Router();

var args = process.argv.slice(2);
process.env.PORT = args[0];
var State = args[1];


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

/* GET process.env variables. */
router.get("/getenv", function (req, res) {
  if (!req.session.userId) {
    // Redirect unauthenticated requests to home page
    res.redirect("/");
  } else {
    if (req.query.variables.length === "State") res.send(State);
    else res.send(process.env[req.query.variables]);
  }
});

router.get("/api/devices", function (req, res) {
  if (!req.session.userId) {
    // Redirect unauthenticated requests to home page
    res.redirect("/");
  } else {
    var tmp = [];

    for (var k in deviceList) {
      var device = deviceList[k];
      tmp.push({
        host: device.host,
        name: device.name,
        type: device.type,
      });
    }

    res.jsonp({
      devices: tmp,
      status: "OK",
    });
  }
});

router.get("/api/playmedia", function (req, res) {
  if (!req.session.userId) {
    // Redirect unauthenticated requests to home page
    res.redirect("/");
  } else {
    var obj = {
      status: "OK",
    };

    if (typeof deviceList[req.query.device] == "undefined") {
      obj = {
        status: "FAIL",
        message: "No device!",
      };
    } else {
      deviceList[req.query.device].play(req.query.mediaURL, 0);
    }

    res.jsonp(obj);
  }
});

router.get("/api/stopmedia", function (req, res) {
  if (!req.session.userId) {
    // Redirect unauthenticated requests to home page
    res.redirect("/");
  } else {
    var obj = {
      status: "OK",
    };

    if (typeof deviceList[req.query.device] == "undefined") {
      obj = {
        status: "FAIL",
        message: "No device!",
      };
    } else {
      deviceList[req.query.device].stop();
    }

    res.jsonp(obj);
  }
});

var deviceList = {};

var browser = new Browser();
browser.onDevice(function (device) {
  device.onError(function (err) {
    console.log(err);
  });

  console.log(
    "new device discovered: " + device.name + " (" + device.type + ")"
  );

  deviceList[device.host] = device;
});
browser.start();

module.exports = router;
