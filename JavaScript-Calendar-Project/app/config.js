"use strict";

const dotenv = require("dotenv");
const assert = require("assert");
dotenv.config();
const {
  OAUTH_CLIENT_ID,
  OAUTH_CLIENT_SECRET,
  OAUTH_REDIRECT_URI_LOCALHOST,
  OAUTH_REDIRECT_URI_LOCALHOST_SECURE,
  OAUTH_REDIRECT_URI,
  OAUTH_REDIRECT_URI_SECURE,
  OAUTH_AUTHORITY,
  OAUTH_SCOPES,
  CALLBACK,
  COOKIE_ENCRYPTION_KEY,
  PORT,
  SQL_USER,
  SQL_PASSWORD,
  SQL_DATABASE,
  SQL_HOST,
  SQL_PORT,
  SQL_INSTANCENAME,
  SQL_ENCRYPT,
  OKTA_ORG_URL,
  OKTA_CLIENT_ID,
  OKTA_SECRET,
  OKTA_REDIRECT_URI,
  OKTA_SCOPES,
  OKTA_AUTHORITY,
  DLNA_USERNAME,
  DLNA_PASSWORD,
  DLNA_PORT,
  DLNA_DEVICE_DESCRIPTOR_PATH,
  DLNA_NAME,
  DLNA_DESCRIPTION,
  DLNA_URL,
  DLNA_ICON_SM,
  DLNA_ICON_LG,
} = process.env;

const sqlEncrypt = process.env.SQL_ENCRYPT === "true";

assert(PORT, "PORT is required");
assert(OAUTH_CLIENT_ID, "OAUTH_CLIENT_ID is required");
assert(OAUTH_CLIENT_SECRET, "OAUTH_CLIENT_SECRET is required");
assert(
  OAUTH_REDIRECT_URI_LOCALHOST,
  "OAUTH_REDIRECT_URI_LOCALHOST is required"
);
assert(
  OAUTH_REDIRECT_URI_LOCALHOST_SECURE,
  "OAUTH_REDIRECT_URI_LOCALHOST_SECURE is required"
);
assert(OAUTH_REDIRECT_URI, "OAUTH_REDIRECT_URI is required");
assert(OAUTH_REDIRECT_URI_SECURE, "OAUTH_REDIRECT_URI_SECURE is required");
assert(COOKIE_ENCRYPTION_KEY, "COOKIE_ENCRYPTION_KEY is required");
assert(SQL_USER, "SQL_USER is required");
assert(SQL_PASSWORD, "SQL_PASSWORD is required");
assert(SQL_DATABASE, "SQL_DATABASE is required");
assert(SQL_HOST, "SQL_HOST is required");
assert(SQL_PORT, "SQL_PORT is required");
assert(SQL_ENCRYPT, "SQL_ENCRYPT is required");
assert(OKTA_ORG_URL, "OKTA_ORG_URL is required");
assert(OKTA_CLIENT_ID, "OKTA_CLIENT_ID is required");
assert(OKTA_SECRET, "OKTA_SECRET is required");
assert(OKTA_REDIRECT_URI, "OKTA_REDIRECT_URI is required");
assert(OKTA_SCOPES, "OKTA_SCOPES is required");
assert(OKTA_AUTHORITY, "OKTA_AUTHORITY is required");
assert(DLNA_USERNAME, "DLNA_USERNAME is required");
assert(DLNA_PASSWORD, "DLNA_PASSWORD is required");
assert(DLNA_PORT, "DLNA_PORT is required");
assert(DLNA_DEVICE_DESCRIPTOR_PATH, "DLNA_DEVICE_DESCRIPTOR_PATH is required");
assert(DLNA_NAME, "DLNA_NAME is required");
assert(DLNA_DESCRIPTION, "DLNA_DESCRIPTION is required");
assert(DLNA_URL, "DLNA_URL is required");
assert(DLNA_ICON_SM, "DLNA_ICON_SM is required");
assert(DLNA_ICON_LG, "DLNA_ICON_LG is required");

module.exports = {
  port: PORT,
  oauth: {
    clientId: OAUTH_CLIENT_ID,
    clientSecret: OAUTH_CLIENT_SECRET,
    redirectUri: OAUTH_REDIRECT_URI,
    redirectUriLocalhost: OAUTH_REDIRECT_URI_LOCALHOST,
    redirectUriLocalhostSecure: OAUTH_REDIRECT_URI_LOCALHOST_SECURE,
    redirectUriSecure: OAUTH_REDIRECT_URI_SECURE,
    authority: OAUTH_AUTHORITY,
    scopes: OAUTH_SCOPES,
    callback: CALLBACK,
  },
  cookie: {
    encryptionKey: COOKIE_ENCRYPTION_KEY,
  },
  sql: {
    user: SQL_USER,
    password: SQL_PASSWORD,
    database: SQL_DATABASE,
    host: SQL_HOST,
    port: SQL_PORT,
    options: {
      encrypt: sqlEncrypt,
      trustedConnection: true,
      connectTimeout: 10000,
      requestTimeout: 10000,
      enableArithAbort: true,
      instancename: SQL_INSTANCENAME,
    },
  },
  okta: {
    orgUrl: OKTA_ORG_URL,
    clientId: OKTA_CLIENT_ID,
    secret: OKTA_SECRET,
    redirectUri: OKTA_REDIRECT_URI,
    scopes: OKTA_SCOPES,
    authority: OKTA_AUTHORITY,
  },
  dlna: {
    username: DLNA_USERNAME,
    password: DLNA_PASSWORD,
    port: DLNA_PORT,
    deviceDescriptorPath: DLNA_DEVICE_DESCRIPTOR_PATH,
    name: DLNA_NAME,
    description: DLNA_DESCRIPTION,
    url: DLNA_URL,
    iconSm: DLNA_ICON_SM,
    iconLg: DLNA_ICON_LG,
  },
};
