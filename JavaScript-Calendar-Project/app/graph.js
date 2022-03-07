var graph = require("@microsoft/microsoft-graph-client");
require("isomorphic-fetch");
var args = process.argv.slice(2);
var State = args[1];

module.exports = {
  getUserDetails: async function (msalClient, userId) {
    const client = getAuthenticatedClient(msalClient, userId);

    const user = await client
      .api("/me")
      .select("displayName,mail,mailboxSettings,userPrincipalName")
      .get();
    return user;
  },

  getCalendarView: async function (msalClient, userId, start, end, timeZone) {
    const client = getAuthenticatedClient(msalClient, userId);

    return (
      client
        .api("/me/calendarview")
        // Add Prefer header to get back times in user's timezone
        .header("Prefer", `outlook.timezone="${timeZone}"`)
        // Add the begin and end of the calendar window
        .query({
          startDateTime: encodeURIComponent(start),
          endDateTime: encodeURIComponent(end),
        })
        // Get just the properties used by the app
        .select("subject,organizer,start,end")
        // Order by start time
        .orderby("start/dateTime")
        // Get at most 50 results
        .top(50)
        .get()
    );
  },
  createEvent: async function (msalClient, userId, formData, timeZone) {
    const client = getAuthenticatedClient(msalClient, userId);

    // Build a Graph event
    const newEvent = {
      subject: formData.subject,
      start: {
        dateTime: formData.start,
        timeZone: timeZone,
      },
      end: {
        dateTime: formData.end,
        timeZone: timeZone,
      },
      body: {
        contentType: "text",
        content: formData.body,
      },
    };

    // Add attendees if present
    if (formData.attendees) {
      newEvent.attendees = [];
      formData.attendees.forEach((attendee) => {
        newEvent.attendees.push({
          type: "required",
          emailAddress: {
            address: attendee,
          },
        });
      });
    }

    // POST /me/events
    await client.api("/me/events").post(newEvent);
  },
};

function getAuthenticatedClient(msalClient, userId) {
  if (!msalClient || !userId) {
    throw new Error(
      `Invalid MSAL state. Client: ${
        msalClient ? "present" : "missing"
      }, User ID: ${userId ? "present" : "missing"}`
    );
  }

  // Initialize Graph client
  const client = graph.Client.init({
    // Implement an auth provider that gets a token
    // from the app's MSAL instance
    authProvider: async (done) => {
      try {
        // Get the user's account
        const account = await msalClient
          .getTokenCache()
          .getAccountByHomeId(userId);

        if (account) {
          // Attempt to get the token silently
          // This method uses the token cache and
          // refreshes expired tokens as needed

          switch (State) {
            case "--secure": {
              const response = await msalClient.acquireTokenSilent({
                scopes: process.env.OAUTH_SCOPES.split(","),
                redirectUri: process.env.OAUTH_REDIRECT_URI_SECURE,
                account: account,
              });
              done(null, response.accessToken);
              console.log("callback uri is set to secure");
              break;
            }
            case "--localhost": {
              const response = await msalClient.acquireTokenSilent({
                scopes: process.env.OAUTH_SCOPES.split(","),
                redirectUri: process.env.OAUTH_REDIRECT_URI_LOCALHOST,
                account: account,
              });
              done(null, response.accessToken);
              console.log("callback uri is set to localhost");
              break;
            }
            case "--localhost-secure": {
              const response = await msalClient.acquireTokenSilent({
                scopes: process.env.OAUTH_SCOPES.split(","),
                redirectUri: process.env.OAUTH_REDIRECT_URI_LOCALHOST_SECURE,
                account: account,
              });
              done(null, response.accessToken);
              console.log("callback uri is set to localhost-secure");
              break;
            }
            default: {
              const response = await msalClient.acquireTokenSilent({
                scopes: process.env.OAUTH_SCOPES.split(","),
                redirectUri: process.env.OAUTH_REDIRECT_URI,
                account: account,
              });
              done(null, response.accessToken);
              console.log("callback uri is set to default");
              break;
            }
          }
        }
      } catch (err) {
        console.log(JSON.stringify(err, Object.getOwnPropertyNames(err)));
        done(err, null);
      }
    },
  });

  return client;
}
