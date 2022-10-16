"use strict";

var express = require("express");
var router = express.Router();
const google = require("./google");

/* GET home page. */
router.get("/", (req, res, next) => {
  if (!req.session.userId) {
    // Redirect unauthenticated requests to home page
    res.redirect("/");
  } else {
    let params = {
      active: { google: true },
    };

    res.render("calendar/test", params);
  }
});

router.post("/createEvent", (req, res, next) => {
  if (!req.session.userId) {
    // Redirect unauthenticated requests to home page
    res.redirect("/");
  } else {
    let params = {
      active: { google: true },
      active: { createEvent: true },
    };
    res.render("calendar/newevent", params);
  }
});

router.get("/getEvent", (req, res, next) => {
  if (!req.session.userId) {
    // Redirect unauthenticated requests to home page
    res.redirect("/");
  } else {
    let params = {
      active: { google: true },
      active: { getEvent: true },
    };
    res.render("calendar/test", params);
  }
});

router.get("/authorize", (req, res, next) => {
  if (!req.session.userId) {
    // Redirect unauthenticated requests to home page
    res.redirect("/");
  } else {
    let params = {
      active: { google: true },
      active: { authorize: true },
    };
    google.authorize(req, res, next);
    google.getAccessToken(req, res, next);
    res.render("calendar/test", params);
  }
});

router.get("/listEvents", (req, res, next) => {
  if (!req.session.userId) {
    // Redirect unauthenticated requests to home page
    res.redirect("/");
  } else {
    let params = {
      active: { google: true },
      active: { listEvents: true },
    };
    google.listEvents(req, res, next);
    res.render("calendar/test", params);
  }
});

router.all(
  "/api/all",
  (req, res, next) => {
    if (req.query) next();
  },
  (req, res, next) => {
    if (!req.session.userId) {
      // Redirect unauthenticated requests to home page
      res.redirect("/");
    } else {
      console.log(
        "Accessing the secret section. In this section you can access all HTTP methods."
      );
      switch (req.query.action) {
        case "get":
          console.log("Retrieving log ...");
          res.render("calendar/test");
          //res.send("Requested: " + req.query);
          break;
        case "post":
          console.log("Creating element in Calendar...");
          res.render("calendar/test");
          //res.send("Requested: " + req.query);
          break;
        case "put":
          console.log("Update element in Calendar ...");
          res.render("calendar/test");
          //res.send("Requested: " + req.query);
          break;
        case "delete":
          console.log("Delete element in Calendar ...");
          res.render("calendar/test");
          //res.send("Requested: " + req.query);
          break;
        default:
          console.log("Rendering Calendar ...");
          res.render("calendar/test");
          //res.send("Requested: " + req.query);
          break;
      }
    }
    next();
  },
  (err, req, res) => {}
);
module.exports = router;
