var regularGreen = "#1d8424";
var regularRed = "#8e2b22";
var regularYellow = "#adab34";
var regularBlue = "#2777a3";
var flashingGreen = "#2ffc3d";
var flashingRed = "#fc2714";
var flashingYellow = "#fcf800";
var flashingBlue = "#0ca8fc";
var currentSteps = [];
var fullSteps = [];

function newStep() {
  if (parseInt($("#count").text()) >= 19) {
    $("#win-modal").modal();
  } else {
    var buttonChoice = Math.round(Math.random() * 3);
    fullSteps.push(buttonChoice);
    currentSteps = fullSteps.slice(0);
    $("#count").text(parseInt($("#count").text()) + 1);
    setTimeout(function() {flashColors(0)}, 800);
  }
}

function flashColors(index) {
  if (index == 0) {
    deactivateBtns();
  }
  flashColor(fullSteps[index]);
  playSound(fullSteps[index]);
  index++;
  if (index >= fullSteps.length) {
    setTimeout(function() {activateBtns();}, 800);
  } else {
    setTimeout(function() {flashColors(index);}, 1000);
  }
}

function flashColor(id) {
  if (id == 0) {
    $("#green-btn").css("background-color", flashingGreen);
  } else if (id == 1) {
    $("#red-btn").css("background-color", flashingRed);
  } else if (id == 2) {
    $("#yellow-btn").css("background-color", flashingYellow);
  } else if (id == 3) {
    $("#blue-btn").css("background-color", flashingBlue);
  }
  setTimeout(function() {resetColors();}, 800);
}

function deactivateBtns() {
  $("#green-btn").off("click");
  $("#red-btn").off("click");
  $("#yellow-btn").off("click");
  $("#blue-btn").off("click");
}

function activateBtns() {
  $("#green-btn").on("click", function() {clickedBtn(0);});
  $("#red-btn").on("click", function() {clickedBtn(1);});
  $("#yellow-btn").on("click", function() {clickedBtn(2);});
  $("#blue-btn").on("click", function() {clickedBtn(3);});
}

function resetColors() {
  $("#green-btn").css("background-color", regularGreen);
  $("#red-btn").css("background-color", regularRed);
  $("#yellow-btn").css("background-color", regularYellow);
  $("#blue-btn").css("background-color", regularBlue);
}

function clickedBtn(id) {
  if (currentSteps[0] == id) {
    playSound(id);
    flashColor(id);
    currentSteps.shift();
    if (currentSteps.length == 0) {
      newStep();
    }
  } else if ($("#strict-mode").prop("checked") == true) {
    mistake();
    restartGame();
  } else {
    mistake();
    setTimeout(function() {flashColors(0);}, 1000);
  }
}

function mistake() {
  flashColor(0);
  flashColor(1);
  flashColor(2);
  flashColor(3);
  playSound(0);
  playSound(1);
  playSound(2);
  playSound(3);
}

function playSound(index) {
  if (index == 0) {
    $("#green-sound").trigger("play");
  } else if (index == 1) {
    $("#red-sound").trigger("play");
  } else if (index == 2) {
    $("#yellow-sound").trigger("play");
  } else if (index == 3) {
    $("#blue-sound").trigger("play");
  }
}

function restartGame() {
  currentSteps = [];
  fullSteps = [];
  $("#count").text(0);
  newStep();
}


$(document).ready(function() {
  $("#start-btn").on("click", function() {
    if ($("#start-btn").text() == "Start") {
      $("#start-btn").removeClass("btn-primary");
      $("#start-btn").addClass("btn-danger");
      $("#start-btn").text("Restart");
    }
    restartGame();
  });
  $("#green-btn").on("click", function() {
    clickedBtn(0);
  });
  $("#red-btn").on("click", function() {
    clickedBtn(1);
  });
  $("#yellow-btn").on("click", function() {
    clickedBtn(2);
  });
  $("#blue-btn").on("click", function() {
    clickedBtn(3);
  });
  $(".new-game-btn").on("click", function() {
    restartGame();
  })
})