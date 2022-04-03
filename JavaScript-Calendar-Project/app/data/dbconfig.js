"use strict";
const config = require("../config");

const dbconfig = {
  server: config.sql.host,
  user: config.sql.user,
  password: config.sql.password,
  database: config.sql.database,
  options: {
    trustedConnection: config.sql.options.trustedConnection,
    enableArithAbort: config.sql.options.enableArithAbort,
    instancename: config.sql.options.instancename,
  },
  port: 1433,
};

module.exports = dbconfig;