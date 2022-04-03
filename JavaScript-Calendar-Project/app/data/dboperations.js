"use strict";

const dbconfig = require("./dbconfig");
const sql = require("mssql");

async function getCalendar() {
  try {
    let pool = await sql.connect(dbconfig);
    let result = await pool.request() 
        .query("SELECT * FROM Calendar");
    return result.recordset;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getCalendar : getCalendar
};
