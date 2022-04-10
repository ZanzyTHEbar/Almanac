/* Future Custom Objects */

/* const config = require("./scopes/utils/config");
const SCOPES = require("./scopes/utils/config.json").scopes;
const { eLog } = require("./scopes/utils/actions");

module.exports = {
  addFunction: function (scope, app) {
    switch (scope) {
      // Default modules, do not change (if you don't know what you're doing)
      case "CLI":
        eLog("[INFO] [CORE] CLI could require further actions");
        let cchanged = false;
        Object.keys(SCOPES)
          .filter((key) => {
            SCOPES[key] && scope !== key;
          })
          .forEach((key) => {
            try {
              app.use("/cli", require(`./scopes/CLI/scopes/${key}`));
              cchanged = true;
            } catch (error) {
              eLog(
                `[WARN] [CORE] ${scope} did find any extra commands for ${key}`
              );
            }
          });
        eLog(
          cchanged
            ? "[FINE] [CORE] CLI further actions loaded"
            : "[WARN] [CORE] CLI did not require any actions"
        );
        break;
      // End of default modules - Supported modules starting
      case "microsoft":
        eLog("[INFO] [CORE] Microsoft could require further action");
        let dchanged = false;
        try {
          const { MicrosoftLogin } = require("./scopes/MSCAL/graph");
          MicrosoftLogin(config.oauth.clientId);
          eLog("[FINE] [CORE] Microsoft data successfully logged in");
          dchanged = true;
        } catch (e) {
          eLog("[ERROR] [CORE] Microsoft data login failed with error: " + e);
        }
        eLog(
          dchanged
            ? "[FINE] [CORE] CLI further actions loaded"
            : "[WARN] [CORE] CLI did not require any actions"
        );
        break;
      // End of supported scopes - add your required actions here like
        case "SCOPE":
                eLog("[CORE] SCOPE requires further action");
                // actions
                eLog("[CORE] SCOPE further actions loaded");
      // Default action, do not remove
      default:
        break;
    }
  },
};
*/
