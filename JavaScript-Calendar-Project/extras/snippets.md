# Snippets

```bash
@echo off
cls
echo [101;93m STYLES [0m
echo [0m [0mReset[0m
echo [1m [1mBold[0m
echo [4m [4mUnderline[0m
echo [7m [7mInverse[0m
echo.
echo [101;93m NORMAL FOREGROUND COLORS [0m
echo [30m [30mBlack[0m (black)
echo [31m [31mRed[0m
echo [32m [32mGreen[0m
echo [33m [33mYellow[0m
echo [34m [34mBlue[0m
echo [35m [35mMagenta[0m
echo [36m [36mCyan[0m
echo [37m [37mWhite[0m
echo.
echo [101;93m NORMAL BACKGROUND COLORS [0m
echo [40m [40mBlack[0m
echo [41m [41mRed[0m
echo [42m [42mGreen[0m
echo [43m [43mYellow[0m
echo [44m [44mBlue[0m
echo [45m [45mMagenta[0m
echo [46m [46mCyan[0m
echo [47m [47mWhite[0m (white)
echo.
echo [101;93m STRONG FOREGROUND COLORS [0m
echo [90m [90mWhite[0m
echo [91m [91mRed[0m
echo [92m [92mGreen[0m
echo [93m [93mYellow[0m
echo [94m [94mBlue[0m
echo [95m [95mMagenta[0m
echo [96m [96mCyan[0m
echo [97m [97mWhite[0m
echo.
echo [101;93m STRONG BACKGROUND COLORS [0m
echo [100m [100mBlack[0m
echo [101m [101mRed[0m
echo [102m [102mGreen[0m
echo [103m [103mYellow[0m
echo [104m [104mBlue[0m
echo [105m [105mMagenta[0m
echo [106m [106mCyan[0m
echo [107m [107mWhite[0m
echo.
echo [101;93m COMBINATIONS [0m
echo [31m                     [31mred foreground color[0m
echo [7m                      [7minverse foreground ^<-^> background[0m
echo [7;31m                   [7;31minverse red foreground color[0m
echo [7m and nested [31m [7mbefore [31mnested[0m
echo [31m and nested [7m [31mbefore [7mnested[0m
```

Execute the (bash) snippet above:

```cmd
.\ansicolours.bat
```

```js
//global variables
var monthEl = $(".c-main");
var dataCel = $(".c-cal__cel");
var dateObj = new Date();
var month = dateObj.getUTCMonth() + 1;
var day = dateObj.getUTCDate();
var year = dateObj.getUTCFullYear();
var monthText = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
var indexMonth = month;
var todayBtn = $(".c-today__btn");
var addBtn = $(".js-event__add");
var saveBtn = $(".js-event__save");
var closeBtn = $(".js-event__close");
var winCreator = $(".js-event__creator");
var inputDate = $(this).data();
today = year + "-" + month + "-" + day;

// ------ set default events -------
function defaultEvents(dataDay, dataName, dataNotes, classTag) {
  var date = $("*[data-day=" + dataDay + "]");
  date.attr("data-name", dataName);
  date.attr("data-notes", dataNotes);
  date.addClass("event");
  date.addClass("event--" + classTag);
}

defaultEvents(today, "YEAH!", "Today is your day", "important");
defaultEvents(
  "2017-12-25",
  "MERRY CHRISTMAS",
  "A lot of gift!!!!",
  "festivity"
);
defaultEvents("2017-05-04", "LUCA'S BIRTHDAY", "Another gifts...?", "birthday");
defaultEvents(
  "2017-03-03",
  "MY LADY'S BIRTHDAY",
  "A lot of money to spent!!!!",
  "birthday"
);

// ------ functions control -------

//button of the current day
todayBtn.on("click", function () {
  if (month < indexMonth) {
    var step = indexMonth % month;
    movePrev(step, true);
  } else if (month > indexMonth) {
    var step = month - indexMonth;
    moveNext(step, true);
  }
});

//highlight the cel of current day
dataCel.each(function () {
  if ($(this).data("day") === today) {
    $(this).addClass("isToday");
    fillEventSidebar($(this));
  }
});

//window event creator
addBtn.on("click", function () {
  winCreator.addClass("isVisible");
  $("body").addClass("overlay");
  dataCel.each(function () {
    if ($(this).hasClass("isSelected")) {
      today = $(this).data("day");
      document.querySelector('input[type="date"]').value = today;
    } else {
      document.querySelector('input[type="date"]').value = today;
    }
  });
});
closeBtn.on("click", function () {
  winCreator.removeClass("isVisible");
  $("body").removeClass("overlay");
});
saveBtn.on("click", function () {
  var inputName = $("input[name=name]").val();
  var inputDate = $("input[name=date]").val();
  var inputNotes = $("textarea[name=notes]").val();
  var inputTag = $("select[name=tags]").find(":selected").text();

  dataCel.each(function () {
    if ($(this).data("day") === inputDate) {
      if (inputName != null) {
        $(this).attr("data-name", inputName);
      }
      if (inputNotes != null) {
        $(this).attr("data-notes", inputNotes);
      }
      $(this).addClass("event");
      if (inputTag != null) {
        $(this).addClass("event--" + inputTag);
      }
      fillEventSidebar($(this));
    }
  });

  winCreator.removeClass("isVisible");
  $("body").removeClass("overlay");
  $("#addEvent")[0].reset();
});

//fill sidebar event info
function fillEventSidebar(self) {
  $(".c-aside__event").remove();
  var thisName = self.attr("data-name");
  var thisNotes = self.attr("data-notes");
  var thisImportant = self.hasClass("event--important");
  var thisBirthday = self.hasClass("event--birthday");
  var thisFestivity = self.hasClass("event--festivity");
  var thisEvent = self.hasClass("event");

  switch (true) {
    case thisImportant:
      $(".c-aside__eventList").append(
        "<p class='c-aside__event c-aside__event--important'>" +
          thisName +
          " <span> • " +
          thisNotes +
          "</span></p>"
      );
      break;
    case thisBirthday:
      $(".c-aside__eventList").append(
        "<p class='c-aside__event c-aside__event--birthday'>" +
          thisName +
          " <span> • " +
          thisNotes +
          "</span></p>"
      );
      break;
    case thisFestivity:
      $(".c-aside__eventList").append(
        "<p class='c-aside__event c-aside__event--festivity'>" +
          thisName +
          " <span> • " +
          thisNotes +
          "</span></p>"
      );
      break;
    case thisEvent:
      $(".c-aside__eventList").append(
        "<p class='c-aside__event'>" +
          thisName +
          " <span> • " +
          thisNotes +
          "</span></p>"
      );
      break;
  }
}
dataCel.on("click", function () {
  var thisEl = $(this);
  var thisDay = $(this).attr("data-day").slice(8);
  var thisMonth = $(this).attr("data-day").slice(5, 7);

  fillEventSidebar($(this));

  $(".c-aside__num").text(thisDay);
  $(".c-aside__month").text(monthText[thisMonth - 1]);

  dataCel.removeClass("isSelected");
  thisEl.addClass("isSelected");
});

//function for move the months
function moveNext(fakeClick, indexNext) {
  for (var i = 0; i < fakeClick; i++) {
    $(".c-main").css({
      left: "-=100%",
    });
    $(".c-paginator__month").css({
      left: "-=100%",
    });
    switch (true) {
      case indexNext:
        indexMonth += 1;
        break;
    }
  }
}
function movePrev(fakeClick, indexPrev) {
  for (var i = 0; i < fakeClick; i++) {
    $(".c-main").css({
      left: "+=100%",
    });
    $(".c-paginator__month").css({
      left: "+=100%",
    });
    switch (true) {
      case indexPrev:
        indexMonth -= 1;
        break;
    }
  }
}

//months paginator
function buttonsPaginator(buttonId, mainClass, monthClass, next, prev) {
  switch (true) {
    case next:
      $(buttonId).on("click", function () {
        if (indexMonth >= 2) {
          $(mainClass).css({
            left: "+=100%",
          });
          $(monthClass).css({
            left: "+=100%",
          });
          indexMonth -= 1;
        }
        return indexMonth;
      });
      break;
    case prev:
      $(buttonId).on("click", function () {
        if (indexMonth <= 11) {
          $(mainClass).css({
            left: "-=100%",
          });
          $(monthClass).css({
            left: "-=100%",
          });
          indexMonth += 1;
        }
        return indexMonth;
      });
      break;
  }
}

buttonsPaginator("#next", monthEl, ".c-paginator__month", false, true);
buttonsPaginator("#prev", monthEl, ".c-paginator__month", true, false);

//launch function to set the current month
moveNext(indexMonth - 1, false);

//fill the sidebar with current day
$(".c-aside__num").text(day);
$(".c-aside__month").text(monthText[month - 1]);
```
