var countingDown = false;
var intervalVar = null;

function updateTime() {
  var oldTime = $("#time").text();
  var minutes = parseInt(oldTime.split(":")[0]);
  var seconds = parseInt(oldTime.split(":")[1]);
  
  if (seconds == 0) {
    if (minutes < 1) {
      changeStatus();
      return null;
    } else {
      minutes -= 1;
      seconds = 59;
    }
  } else {
    seconds -= 1;
  }
  var newTime = minutes + ":";
  if (seconds < 10) {
    newTime += "0" + seconds;
  } else {
    newTime += seconds;
  }
  $("#time").text(newTime);
  updateProgressBar(minutes, seconds);
}

function updateProgressBar(minutes, seconds) {
  if ($("#status").text() == "Session") {
    var maxTime = parseInt($("#session-length").text()) * 60;
  } else {
    var maxTime = parseInt($("#break-length").text()) * 60;
  }
  var timePassed = maxTime - (minutes * 60 + seconds);
  var percentage = timePassed / maxTime * 100;
  $("#progress-bar").css("width", percentage + "%");
}

function changeStatus() {
  var oldStatus = $("#status").text();
  if (oldStatus == "Session") {
    $("#status").text("Break");
    deactivateCounting();
    $("#time").text($("#break-length").text() + ":00");
    activateCounting();
  } else {
    $("#status").text("Session");
    deactivateCounting();
    $("#time").text($("#session-length").text() + ":00");
    activateCounting();
  }
}

function toggleCounting() {
  if (countingDown) {
      deactivateCounting();
    } else {
      activateCounting();
    }
}

function deactivateCounting() {
  clearInterval(intervalVar);
  countingDown = false;
}

function activateCounting() {
  updateTime();
  intervalVar = setInterval(updateTime, 1000);
  countingDown = true;
}

function reset() {
  $("#status").text("Session");
  $("#time").text($("#session-length").text() + ":00");
  $("#progress-bar").css("width", "0%");
}

$("document").ready(function() {
  $("#minus-session").on("click", function() {
    if (parseInt($("#session-length").text()) >= 2) {
      $("#session-length").text(parseInt($("#session-length").text()) - 1);
      reset();
    }
  });
  $("#plus-session").on("click", function() {
    $("#session-length").text(parseInt($("#session-length").text()) + 1);
    reset();
  });
  $("#minus-break").on("click", function() {
    if (parseInt($("#break-length").text()) >= 2) {
      $("#break-length").text(parseInt($("#break-length").text()) - 1);
      reset();
    }
  });
  $("#plus-break").on("click", function() {
    $("#break-length").text(parseInt($("#break-length").text()) + 1);
    reset();
  });
  $("#progress-bar-container").on("click", function() {
    toggleCounting();
  });
  $("#reset-btn").on("click", function() {
    reset();
  });
})