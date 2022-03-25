async function grabENV(url, env) {
  if (env.length === 0) env = ["NODE_ENV"];
  let response = await fetch(url + "?variables=" + env);
  let data = await response.text();
  return data;
}

const params = await grabENV("/dlna/getenv", "State");
console.log(params);

$(function () {
  switch (params) {
    case "--localhost-secure":
      $getJSON(
        grabENV("/dlna/getenv", "OAUTH_REDIRECT_URI_LOCALHOST") +
          ":" +
          grabENV("/dlna/getenv", "PORT") +
          "/api/devices?callback=?",
        function (json) {
          var html = "<option>Select device</option>";
          for (var i in json.devices) {
            var device = json.devices[i];

            html +=
              '<option value="' +
              device.host +
              '">' +
              device.name +
              " (" +
              device.type +
              ")</option>";
          }
          $("#device").html(html);
        }
      );

      $("#play").click(function (e) {
        e.preventDefault();

        $.getJSON(
          grabENV("/dlna/getenv", "OAUTH_REDIRECT_URI_LOCALHOST_SECURE") +
            ":" +
            grabENV("/dlna/getenv", "PORT") +
            "/api/playmedia?device=" +
            $("#device").val() +
            "&mediaURL=" +
            encodeURIComponent($("#mediaURL").val()) +
            "&callback=?",
          function (json) {
            if (json.status != "OK") {
              alert(json.status + ": " + json.message);
            } else {
              $("#mediaURL").val("");
            }
          }
        );
      });

      $("#stop").click(function (e) {
        e.preventDefault();

        $.getJSON(
          grabENV("/dlna/getenv", "OAUTH_REDIRECT_URI_LOCALHOST_SECURE") +
            ":" +
            grabENV("/dlna/getenv", "PORT") +
            "/api/stopmedia?device=" +
            $("#device").val() +
            "&callback=?",
          function (json) {
            if (json.status != "OK") {
              alert(json.status + ": " + json.message);
            }
          }
        );
      });
      break;
    case "--secure":
      $.getJSON(
        grabENV("/dlna/getenv", "OAUTH_REDIRECT_URI_SECURE") +
          ":" +
          grabENV("/dlna/getenv", "PORT") +
          "/api/devices?callback=?",
        function (json) {
          var html = "<option>Select device</option>";
          for (var i in json.devices) {
            var device = json.devices[i];

            html +=
              '<option value="' +
              device.host +
              '">' +
              device.name +
              " (" +
              device.type +
              ")</option>";
          }
          $("#device").html(html);
        }
      );

      $("#play").click(function (e) {
        e.preventDefault();

        $.getJSON(
          grabENV("/dlna/getenv", "OAUTH_REDIRECT_URI_SECURE") +
            ":" +
            grabENV("/dlna/getenv", "PORT") +
            "/api/playmedia?device=" +
            $("#device").val() +
            "&mediaURL=" +
            encodeURIComponent($("#mediaURL").val()) +
            "&callback=?",
          function (json) {
            if (json.status != "OK") {
              alert(json.status + ": " + json.message);
            } else {
              $("#mediaURL").val("");
            }
          }
        );
      });

      $("#stop").click(function (e) {
        e.preventDefault();

        $.getJSON(
          grabENV("/dlna/getenv", "OAUTH_REDIRECT_URI_SECURE") +
            ":" +
            grabENV("/dlna/getenv", "PORT") +
            "/api/stopmedia?device=" +
            $("#device").val() +
            "&callback=?",
          function (json) {
            if (json.status != "OK") {
              alert(json.status + ": " + json.message);
            }
          }
        );
      });
      break;
    case "--localhost":
      $.getJSON(
        grabENV("/dlna/getenv", "OAUTH_REDIRECT_URI_LOCALHOST") +
          ":" +
          grabENV("/dlna/getenv", "PORT") +
          "/api/devices?callback=?",
        function (json) {
          var html = "<option>Select device</option>";
          for (var i in json.devices) {
            var device = json.devices[i];

            html +=
              '<option value="' +
              device.host +
              '">' +
              device.name +
              " (" +
              device.type +
              ")</option>";
          }
          $("#device").html(html);
        }
      );

      $("#play").click(function (e) {
        e.preventDefault();

        $.getJSON(
          grabENV("/dlna/getenv", "OAUTH_REDIRECT_URI_LOCALHOST") +
            ":" +
            grabENV("/dlna/getenv", "PORT") +
            "/api/playmedia?device=" +
            $("#device").val() +
            "&mediaURL=" +
            encodeURIComponent($("#mediaURL").val()) +
            "&callback=?",
          function (json) {
            if (json.status != "OK") {
              alert(json.status + ": " + json.message);
            } else {
              $("#mediaURL").val("");
            }
          }
        );
      });

      $("#stop").click(function (e) {
        e.preventDefault();

        $.getJSON(
          grabENV("/dlna/getenv", "OAUTH_REDIRECT_URI_LOCALHOST") +
            ":" +
            grabENV("/dlna/getenv", "PORT") +
            "/api/stopmedia?device=" +
            $("#device").val() +
            "&callback=?",
          function (json) {
            if (json.status != "OK") {
              alert(json.status + ": " + json.message);
            }
          }
        );
      });
      break;
    default:
      $.getJSON(
        grabENV("/dlna/getenv", "OAUTH_REDIRECT_URI") +
          ":" +
          grabENV("/dlna/getenv", "PORT") +
          "/api/devices?callback=?",
        function (json) {
          var html = "<option>Select device</option>";
          for (var i in json.devices) {
            var device = json.devices[i];

            html +=
              '<option value="' +
              device.host +
              '">' +
              device.name +
              " (" +
              device.type +
              ")</option>";
          }
          $("#device").html(html);
        }
      );

      $("#play").click(function (e) {
        e.preventDefault();

        $.getJSON(
          grabENV("/dlna/getenv", "OAUTH_REDIRECT_URI") +
            ":" +
            grabENV("/dlna/getenv", "PORT") +
            "/api/playmedia?device=" +
            $("#device").val() +
            "&mediaURL=" +
            encodeURIComponent($("#mediaURL").val()) +
            "&callback=?",
          function (json) {
            if (json.status != "OK") {
              alert(json.status + ": " + json.message);
            } else {
              $("#mediaURL").val("");
            }
          }
        );
      });

      $("#stop").click(function (e) {
        e.preventDefault();

        $.getJSON(
          grabENV("/dlna/getenv", "OAUTH_REDIRECT_URI") +
            ":" +
            grabENV("/dlna/getenv", "PORT") +
            "/api/stopmedia?device=" +
            $("#device").val() +
            "&callback=?",
          function (json) {
            if (json.status != "OK") {
              alert(json.status + ": " + json.message);
            }
          }
        );
      });
      break;
  }
});
