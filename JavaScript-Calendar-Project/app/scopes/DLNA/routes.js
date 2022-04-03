("use strict");

var express = require("express");
var router = express.Router();
const MediaRendererClient = require("upnp-mediarenderer-client");
const url = require("url");
const http = require("http");
const xmltojs = require("xml2js");
const browseServer = require("dlna-browser-utils");
const config = require("../utils/config");

const mediaServerName = "LoveHouseFTP";

const Client = require("node-ssdp").Client,
  client = new Client();

const args = process.argv.slice(2);
config.port = args[0];
const State = args[1];
var done = false;
/* 
// Instantiate a client with a device description URL (discovered by SSDP)
var client = new MediaRendererClient(
  process.env.DLNA_URL +
    process.env.DLNA_PORT +
    process.env.DLNA_DEVICE_DESCRIPTOR_PATH
);

// Load a stream with subtitles and play it immediately
var options = {
  autoplay: true,
  contentType: "audio/mp3",
  metadata: {
    title: "1987",
    creator: "Whitesnake",
    type: "audio", // can be 'video', 'audio' or 'image'
    subtitlesUrl: "http://url.to.some/subtitles.srt",
  },
};

client.load("http://url.to.some/stream.avi", options, function (err, result) {
  if (err) throw err;
  console.log("playing ...");
});

// Pause the current playing stream
client.pause();

// Unpause
client.play();

// Stop
client.stop();

// Seek to 10 minutes
client.seek(10 * 60);

// Get the volume
client.getVolume(function (err, volume) {
  if (err) throw err;
  console.log(volume); // the volume range is 0-100
});

// Set the volume
client.setVolume(40, function (err) {
  if (err) throw err;
  console.log("volume is now", volume);
});

client.on("status", function (status) {
  // Reports the full state of the AVTransport service the first time it fires,
  // then reports diffs. Can be used to maintain a reliable copy of the
  // service internal state.
  console.log(status);
});

client.on("loading", function () {
  console.log("loading");
});

client.on("playing", function () {
  console.log("playing");

  client.getPosition(function (err, position) {
    console.log(position); // Current position in seconds
  });

  client.getDuration(function (err, duration) {
    console.log(duration); // Media duration in seconds
  });
});

client.on("paused", function () {
  console.log("paused");
});

client.on("stopped", function () {
  console.log("stopped");
});

client.on("speedChanged", function (speed) {
  // Fired when the user rewinds of fast-forwards the media from the remote
  console.log("speedChanged", speed);
});
*/

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
    if (req.query.variables === "State") res.send(State);
    else res.send(config.dlna[req.query.variables]);
  }
});

router.get("/api/devices", function (req, res) {
  if (!req.session.userId) {
    // Redirect unauthenticated requests to home page
    res.redirect("/");
  } else {
  }
});

router.get("/api/playmedia", function (req, res) {
  if (!req.session.userId) {
    // Redirect unauthenticated requests to home page
    res.redirect("/");
  } else {
  }
});

router.get("/api/stopmedia", function (req, res) {
  if (!req.session.userId) {
    // Redirect unauthenticated requests to home page
    res.redirect("/");
  } else {
  }
});

router.get("/api/search_dlna_services", function (req, res) {
  if (!req.session.userId) {
    // Redirect unauthenticated requests to home page
    res.redirect("/");
  } else {
    client.on("response", function (headers, statusCode, rinfo) {
      console.log("Got a response to an m-search.");
      console.log("headers: " + JSON.stringify(headers));
      console.log("statusCode: " + statusCode);
      console.log("rinfo: " + JSON.stringify(rinfo));
    });

    // search for a service type
    client.search("urn:schemas-upnp-org:service:ContentDirectory:1");

    // Or get a list of all services on the network

    //client.search("ssdp:all");
    res.render("dlna", {});
  }
});

router.get("/api/search_dlna_services_poll", function (req, res) {
  if (!req.session.userId) {
    // Redirect unauthenticated requests to home page
    res.redirect("/");
  } else {
    client.on("response", function (headers, statusCode, rinfo) {
      const requestUrl = url.parse(headers.LOCATION);

      const httpOptions = {
        host: requestUrl.hostname,
        port: requestUrl.port,
        path: requestUrl.pathname,
      };

      const req = http.request(httpOptions, function (response) {
        var data = "";
        response.on("data", function (newData) {
          data = data + newData;
        });

        response.on("end", function () {
          if (done == true) {
            return;
          }
          xmltojs.parseString(data, function (err, result) {
            if (
              result.root.device[0].friendlyName.toString() === mediaServerName
            ) {
              done = true;
              if (
                result.root.device[0].serviceList[0].service[0]
                  .serviceType[0] ===
                "urn:schemas-upnp-org:service:ContentDirectory:1"
              ) {
                const controlUrl =
                  "http://" +
                  requestUrl.hostname +
                  ":" +
                  requestUrl.port +
                  result.root.device[0].serviceList[0].service[0].controlURL[0];
                console.log(controlUrl);

                browseServer("0", controlUrl, {}, function (err, result) {
                  if (err) {
                    console.log(err);
                    return;
                  }

                  if (result.container) {
                    for (let i = 0; i < result.container.length; i++) {
                      console.log("Container:" + result.container[i].id);
                      browseServer(
                        result.container[i].id,
                        controlUrl,
                        {},
                        function (err, result) {
                          if (err) {
                            console.log(err);
                            return;
                          }
                          console.log(result);
                          if (result.container.item) {
                            for (
                              let i = 0;
                              i < result.container.item.length;
                              i++
                            ) {
                              console.log(
                                "Item:" + result.container[i].item[i].title
                              );
                            }
                          }
                        }
                      );
                    }
                  }
                });
              }
            }
          });
        });
      });
      req.on("error", function (err) {
        console.log(err);
      });
      req.end();
    });

    // search for media server and display top level content
    client.search("urn:schemas-upnp-org:service:ContentDirectory:1");

    setTimeout(function () {
      console.log("done");
    }, 10000);
  }
});

module.exports = router;
