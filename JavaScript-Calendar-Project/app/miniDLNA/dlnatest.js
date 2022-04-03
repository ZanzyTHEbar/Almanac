/* const parseString */
const requests = require("request");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
global.DOMParser = new JSDOM().window.DOMParser;

var body,
  containers,
  content,
  folders,
  headers,
  items,
  minidlna,
  pretty,
  request,
  result,
  root,
  services;

/* console.log(`Please enter the URL of the DLNA server you want to search for (eg: http://192.168.1.1:8200) 
  `); */
minidlna = "http://192.168.1.1:8200";
headers = {
  "Content-Type": "text/xml; charset=utf-8",
  SOAPACTION: "urn:schemas-upnp-org:service:ContentDirectory:1#Browse",
};

function parseString(xml) {
  var parser, xmlDoc;

  parser = new DOMParser();
  xmlDoc = parser.parseFromString(xml, "text/xml");

  return xmlDoc;
}

function get_object_id(index) {
  return (
    '\n      <?xml version="1.0" encoding="utf-8"?>\n        <s:Envelope xmlns:ns0="urn:schemas-upnp-org:service:ContentDirectory:1" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/" s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">\n          <s:Body>\n            <ns0:Browse>\n              <ObjectID>%s</ObjectID>\n              <BrowseFlag>BrowseDirectChildren</BrowseFlag>\n              <Filter>*</Filter>\n            </ns0:Browse>\n          </s:Body>\n        </s:Envelope>\n      </xml>\n    ' %
    index
  );
}

function parse_service(service) {
  var name, url;
  name = service.getElementsByTagName("serviceType")[0].firstChild.nodeValue;
  url = service.getElementsByTagName("controlURL")[0].firstChild.nodeValue;
  console.log(`Service: ${name}`);
  console.log(`URL: ${url}`);
  return {
    name: name,
    url: url,
  };
}

function parse_container(container) {
  var index, title;
  index = container.getAttribute("id");
  title = container.getElementsByTagName("dc:title")[0].firstChild.nodeValue;
  return {
    index: index,
    title: title,
  };
}

function parse_item(item) {
  var index, title;
  index = item.getAttribute("id");
  title = item.getElementsByTagName("dc:title")[0].firstChild.nodeValue;
  result = item.getElementsByTagName("res")[0];
  return {
    index: index,
    title: title,
    size: result.getAttribute("size"),
    duration: result.getAttribute("duration"),
    bitrate: result.getAttribute("bitrate"),
    sampling: result.getAttribute("sampleFrequency"),
    channels: result.getAttribute("nrAudioChannels"),
    resolution: result.getAttribute("resolution"),
    url: result.firstChild.nodeValue,
  };
}

result = requests(
  "%s%s" % [minidlna, "/rootDesc.xml"],
  function (error, response, body) {
    console.error("error:", error); // Print the error if one occurred
    console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
    console.log("body:", body); // Print the HTML for the Google homepage.
  }
);

root = parseString(result.content);
services = list(
  map((service) => {
    return parse_service(service);
  }, root.getElementsByTagName("service"))
);

content = function () {
  var _pj_a = [],
    _pj_b = services;

  for (var _pj_c = 0, _pj_d = _pj_b.length; _pj_c < _pj_d; _pj_c += 1) {
    var service = _pj_b[_pj_c];

    if (service["name"] === "urn:schemas-upnp-org:service:ContentDirectory:1") {
      _pj_a.push(service);
    }
  }

  return _pj_a;
}.call(this)[0];

request = "%s%s" % [minidlna, content["url"]];
result = requests.post(request, {
  data: get_object_id("0"),
  headers: headers,
});
root = parseString(result.content);
body = parseString(root.getElementsByTagName("Result")[0].firstChild.nodeValue);
containers = list(
  map((container) => {
    return parse_container(container);
  }, body.getElementsByTagName("container"))
);

for (
  var container, _pj_c = 0, _pj_a = containers, _pj_b = _pj_a.length;
  _pj_c < _pj_b;
  _pj_c += 1
) {
  container = _pj_a[_pj_c];
  console.log(container["index"], container["title"]);
  result = requests.post(request, {
    data: get_object_id(container["index"]),
    headers: headers,
  });
  root = parseString(result.content);
  body = parseString(
    root.getElementsByTagName("Result")[0].firstChild.nodeValue
  );
  pretty = body.toprettyxml();
  console.log(pretty);
  folders = list(
    map((container) => {
      return parse_container(container);
    }, body.getElementsByTagName("container"))
  );

  for (
    var folder, _pj_f = 0, _pj_d = folders, _pj_e = _pj_d.length;
    _pj_f < _pj_e;
    _pj_f += 1
  ) {
    folder = _pj_d[_pj_f];
    console.log(folder["index"], folder["title"]);
    result = requests.post(request, {
      data: get_object_id(folder["index"]),
      headers: headers,
    });
    root = parseString(result.content);
    body = parseString(
      root.getElementsByTagName("Result")[0].firstChild.nodeValue
    );
    pretty = body.toprettyxml();
    console.log(pretty);
    items = list(
      map((item) => {
        return parse_item(item);
      }, body.getElementsByTagName("item"))
    );

    for (
      var item, _pj_i = 0, _pj_g = items, _pj_h = _pj_g.length;
      _pj_i < _pj_h;
      _pj_i += 1
    ) {
      item = _pj_g[_pj_i];
      console.log("Index", item["index"]);
      console.log("Title", item["title"]);
      console.log("Size", item["size"]);
      console.log("Duration", item["duration"]);
      console.log("Bitrate", item["bitrate"]);
      console.log("Sampling", item["sampling"]);
      console.log("Channels", item["channels"]);
      console.log("Resolution", item["resolution"]);
      console.log("Url", item["url"]);
      console.log("----");
    }

    console.log("----");
  }
}
