!(function () {
  var decodedJson = decodeURIComponent("{{{encodedJson}}}");
  var jsonObj = JSON.parse(decodedJson);
  console.log(jsonObj);
  //create for each event
  var events = [];
  for (var i = 0; i < jsonObj.events.length; i++) {
      var events = jsonObj.events[i];
      var eventName = events.subject;
      var eventId = events.id;
      var eventOrganizer = events.organizer.emailAddress;
      var eventOrganizerName = events.organizer.emailAddress.name;
      var eventOrganizerEmail = events.organizer.emailAddress.address;
      var eventStartTime = events.start.dateTime;
      var startTimeZone = events.start.timeZone;
      var eventEndTime = events.end.dateTime;
      var endTimeZone = events.end.timeZone;
  }

  console.log(events);
  var data = [
      {
          eventName: eventName,
          eventId: eventId,
          eventOrganizer: eventOrganizer,
          eventOrganizerName: eventOrganizerName,
          eventOrganizerEmail: eventOrganizerEmail,
          eventStartTime: eventStartTime,
          startTimeZone: startTimeZone,
          eventEndTime: eventEndTime,
          endTimeZone: endTimeZone,
          calendar: eventName,
          color: (function (param) {
              switch (param) {
                  case "Work":
                      return "red";
                      break;
                  case "Personal":
                      return "green";
                      break;
                  case "Family":
                      return "brown";
                      break;
                  case "Friends":
                      return "yellow";
                      break;
                  case "Other":
                      return "orange";
                      break;
                  case "Birthday":
                      return "purple";
                      break;
                  case "Anniversary":
                      return "blue";
                      break;
                  case "Focus Time":
                      return "pink";
                      break;
                  default:
                      return "black";
                      break;
              }
          })(eventName),
      }
    ];
    //console.log(data);
})();