"use strict";

async function logParams() {
  const params = await grabENV("/dlna/getenv", "State");
  console.log("params: " + params);
  return params;
}

async function grabENV(url, env) {
  if (env.length === 0) env = ["NODE_ENV"];
  let response = await fetch(url + "?variables=" + env);
  let data = await response.text();
  return data;
}

logParams();
