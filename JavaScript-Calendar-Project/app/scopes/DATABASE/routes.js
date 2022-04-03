var express = require("express");
var router = express.Router();

/* GET home page. */
router.get(
  "/",
  function (req, res, next) {
    if (req.query) next();
  },
  (req, res, next) => {
    if (!req.session.userId) {
      // Redirect unauthenticated requests to home page
      res.redirect("/");
    } else {
      res.render("database");
      //res.send("Requested: " + req.query);
    }
    next();
  },
  (err, req, res) => {}
);

router.all(
  "/secret",
  function (req, res, next) {
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
          res.send("Requested: " + req.query);
          break;
        case "post":
          console.log("Creating element in database...");
          res.send("Requested: " + req.query);
          break;
        case "put":
          console.log("Update element in database ...");
          res.send("Requested: " + req.query);
          break;
        case "delete":
          console.log("Delete element in database ...");
          res.send("Requested: " + req.query);
          break;
        default:
          console.log("New log entry ...");
          res.send("Requested: " + req.query);
          break;
      }
      //res.render("database");
    }
    next();
  },
  (err, req, res) => {}
);

module.exports = router;
