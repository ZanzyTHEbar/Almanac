"use strict";
const config = require("../config");
const graph = require("../graph");
const router = require("express-promise-router")();
var args = process.argv.slice(2);
config.port = args[0];
var State = args[1];

/* GET auth callback. */
router.get("/signin", async function (req, res) {
  switch (State) {
    case "--secure": {
      const urlParameters = {
        scopes: config.oauth.scopes.split(","),
        redirectUri:
          config.oauth.redirectUriSecure +
          ":" +
          config.port +
          config.oauth.callback,
      };

      try {
        const authUrl = await req.app.locals.msalClient.getAuthCodeUrl(
          urlParameters
        );
        res.redirect(authUrl);
      } catch (error) {
        console.log(`Error: ${error}`);
        req.flash("error_msg", {
          message: "Error getting auth URL",
          debug: JSON.stringify(error, Object.getOwnPropertyNames(error)),
        });
        res.redirect("/");
      }
      console.log("callback uri is set to secure");
      break;
    }
    case "--localhost": {
      const urlParameters = {
        scopes: config.oauth.scopes.split(","),
        redirectUri:
          config.oauth.redirectUriLocalhost +
          ":" +
          config.port +
          config.oauth.callback,
      };

      try {
        const authUrl = await req.app.locals.msalClient.getAuthCodeUrl(
          urlParameters
        );
        res.redirect(authUrl);
      } catch (error) {
        console.log(`Error: ${error}`);
        req.flash("error_msg", {
          message: "Error getting auth URL",
          debug: JSON.stringify(error, Object.getOwnPropertyNames(error)),
        });
        res.redirect("/");
      }
      console.log("callback uri is set to localhost");
      break;
    }
    case "--localhost-secure": {
      const urlParameters = {
        scopes: config.oauth.scopes.split(","),
        redirectUri:
          config.oauth.redirectUriLocalhostSecure +
          ":" +
          config.port +
          config.oauth.callback,
      };

      try {
        const authUrl = await req.app.locals.msalClient.getAuthCodeUrl(
          urlParameters
        );
        res.redirect(authUrl);
      } catch (error) {
        console.log(`Error: ${error}`);
        req.flash("error_msg", {
          message: "Error getting auth URL",
          debug: JSON.stringify(error, Object.getOwnPropertyNames(error)),
        });
        res.redirect("/");
      }
      console.log("callback uri is set to localhost-secure");
      break;
    }
    default: {
      const urlParameters = {
        scopes: config.oauth.scopes.split(","),
        redirectUri:
          config.oauth.redirectUri + ":" + config.port + config.oauth.callback,
      };

      try {
        const authUrl = await req.app.locals.msalClient.getAuthCodeUrl(
          urlParameters
        );
        res.redirect(authUrl);
      } catch (error) {
        console.log(`Error: ${error}`);
        req.flash("error_msg", {
          message: "Error getting auth URL",
          debug: JSON.stringify(error, Object.getOwnPropertyNames(error)),
        });
        res.redirect("/");
      }
      console.log("callback uri is set to default");
      break;
    }
  }
});

router.get("/callback", async function (req, res) {
  switch (State) {
    case "--secure": {
      const tokenRequest = {
        code: req.query.code,
        scopes: config.oauth.scopes.split(","),
        redirectUri:
          config.oauth.redirectUriSecure +
          ":" +
          config.port +
          config.oauth.callback,
      };
      console.log("callback uri is set to secure");
      try {
        const response = await req.app.locals.msalClient.acquireTokenByCode(
          tokenRequest
        );

        // Save the user's homeAccountId in their session
        req.session.userId = response.account.homeAccountId;

        const user = await graph.getUserDetails(
          req.app.locals.msalClient,
          req.session.userId
        );

        // Add the user to user storage
        req.app.locals.users[req.session.userId] = {
          displayName: user.displayName,
          email: user.mail || user.userPrincipalName,
          timeZone: user.mailboxSettings.timeZone,
        };
      } catch (error) {
        req.flash("error_msg", {
          message: "Error completing authentication",
          debug: JSON.stringify(error, Object.getOwnPropertyNames(error)),
        });
      }

      res.redirect("/");
      break;
    }
    case "--localhost": {
      const tokenRequest = {
        code: req.query.code,
        scopes: config.oauth.scopes.split(","),
        redirectUri:
          config.oauth.redirectUriLocalhost +
          ":" +
          config.port +
          config.oauth.callback,
      };
      console.log("callback uri is set to localhost");
      try {
        const response = await req.app.locals.msalClient.acquireTokenByCode(
          tokenRequest
        );

        // Save the user's homeAccountId in their session
        req.session.userId = response.account.homeAccountId;

        const user = await graph.getUserDetails(
          req.app.locals.msalClient,
          req.session.userId
        );

        // Add the user to user storage
        req.app.locals.users[req.session.userId] = {
          displayName: user.displayName,
          email: user.mail || user.userPrincipalName,
          timeZone: user.mailboxSettings.timeZone,
        };
      } catch (error) {
        req.flash("error_msg", {
          message: "Error completing authentication",
          debug: JSON.stringify(error, Object.getOwnPropertyNames(error)),
        });
      }

      res.redirect("/");
      break;
    }
    case "--localhost-secure": {
      const tokenRequest = {
        code: req.query.code,
        scopes: config.oauth.scopes.split(","),
        redirectUri:
          config.oauth.redirectUriLocalhostSecure +
          ":" +
          config.port +
          config.oauth.callback,
      };
      console.log("callback uri is set to localhost-secure");
      try {
        const response = await req.app.locals.msalClient.acquireTokenByCode(
          tokenRequest
        );

        // Save the user's homeAccountId in their session
        req.session.userId = response.account.homeAccountId;

        const user = await graph.getUserDetails(
          req.app.locals.msalClient,
          req.session.userId
        );

        // Add the user to user storage
        req.app.locals.users[req.session.userId] = {
          displayName: user.displayName,
          email: user.mail || user.userPrincipalName,
          timeZone: user.mailboxSettings.timeZone,
        };
      } catch (error) {
        req.flash("error_msg", {
          message: "Error completing authentication",
          debug: JSON.stringify(error, Object.getOwnPropertyNames(error)),
        });
      }

      res.redirect("/");
      break;
    }
    default: {
      const tokenRequest = {
        code: req.query.code,
        scopes: config.oauth.scopes.split(","),
        redirectUri:
          config.oauth.redirectUri + ":" + config.port + config.oauth.callback,
      };
      console.log("callback uri is set to default");
      try {
        const response = await req.app.locals.msalClient.acquireTokenByCode(
          tokenRequest
        );

        // Save the user's homeAccountId in their session
        req.session.userId = response.account.homeAccountId;

        const user = await graph.getUserDetails(
          req.app.locals.msalClient,
          req.session.userId
        );

        // Add the user to user storage
        req.app.locals.users[req.session.userId] = {
          displayName: user.displayName,
          email: user.mail || user.userPrincipalName,
          timeZone: user.mailboxSettings.timeZone,
        };
      } catch (error) {
        req.flash("error_msg", {
          message: "Error completing authentication",
          debug: JSON.stringify(error, Object.getOwnPropertyNames(error)),
        });
      }

      res.redirect("/");
      break;
    }
  }
});

router.get("/signout", async function (req, res) {
  // Sign out
  if (req.session.userId) {
    // Look up the user's account in the cache
    const accounts = await req.app.locals.msalClient
      .getTokenCache()
      .getAllAccounts();

    const userAccount = accounts.find(
      (a) => a.homeAccountId === req.session.userId
    );

    // Remove the account
    if (userAccount) {
      req.app.locals.msalClient.getTokenCache().removeAccount(userAccount);
    }
  }

  // Destroy the user's session
  req.session.destroy(function (err) {
    res.redirect("/");
  });
});

module.exports = router;
