const regularGreen = "#1d8424";
const regularRed = "#8e2b22";
const regularYellow = "#adab34";
const regularBlue = "#2777a3";
const flashingGreen = "#2ffc3d";
const flashingRed = "#fc2714";
const flashingYellow = "#fcf800";
const flashingBlue = "#0ca8fc";
let currentSteps = [];
let fullSteps = [];

function newStep() {
  const countElement = document.getElementById("count");

  if (parseInt(countElement.textContent) >= 19) {
    document.getElementById("win-modal").modal();
  } else {
    const buttonChoice = Math.round(Math.random() * 3);
    fullSteps.push(buttonChoice);
    currentSteps = fullSteps.slice(0);
    countElement.textContent = parseInt(countElement.textContent) + 1;
    setTimeout(() => {flashColors(0)}, 800);
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
    setTimeout(activateBtns, 800);
  } else {
    setTimeout(() => {flashColors(index)}, 1000);
  }
}

function flashColor(id) {
  if (id == 0) {
    document.getElementById("green-btn").style.backgroundColor = flashingGreen;
  } else if (id == 1) {
    document.getElementById("red-btn").style.backgroundColor = flashingRed;
  } else if (id == 2) {
    document.getElementById("yellow-btn").style.backgroundColor = flashingYellow;
  } else if (id == 3) {
    document.getElementById("blue-btn").style.backgroundColor = flashingBlue;
  }
  setTimeout(resetColors, 800);
}

function deactivateBtns() {
  document.getElementById("green-btn").removeEventListener("click", clickGreenBtn);
  document.getElementById("red-btn").removeEventListener("click", clickRedBtn);
  document.getElementById("yellow-btn").removeEventListener("click", clickYellowBtn);
  document.getElementById("blue-btn").removeEventListener("click", clickBlueBtn);
}

function activateBtns() {
  document.getElementById("green-btn").addEventListener("click", clickGreenBtn);
  document.getElementById("red-btn").addEventListener("click", clickRedBtn);
  document.getElementById("yellow-btn").addEventListener("click", clickYellowBtn);
  document.getElementById("blue-btn").addEventListener("click", clickBlueBtn);
}

function resetColors() {
  document.getElementById("green-btn").style.backgroundColor = regularGreen;
  document.getElementById("red-btn").style.backgroundColor = regularRed;
  document.getElementById("yellow-btn").style.backgroundColor = regularYellow;
  document.getElementById("blue-btn").style.backgroundColor = regularBlue;
}

function clickedBtn(id) {
  if (currentSteps[0] == id) {
    playSound(id);
    flashColor(id);
    currentSteps.shift();
    if (currentSteps.length == 0) {
      newStep();
    }
  } else if (document.getElementById("strict-mode").checked == true) {
    mistake();
    restartGame();
  } else {
    mistake();
    setTimeout(() => {flashColors(0)}, 1000);
  }
}

function clickGreenBtn() {
  clickedBtn(0);
}
function clickRedBtn() {
  clickedBtn(1);
}
function clickYellowBtn() {
  clickedBtn(2);
}
function clickBlueBtn() {
  clickedBtn(3);
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
    document.getElementById("green-sound").play();
  } else if (index == 1) {
    document.getElementById("red-sound").play();
  } else if (index == 2) {
    document.getElementById("yellow-sound").play();
  } else if (index == 3) {
    document.getElementById("blue-sound").play();
  }
}

function restartGame() {
  currentSteps = [];
  fullSteps = [];
  document.getElementById("count").textContent = 0;
  newStep();
}


document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("start-btn").addEventListener("click", () => {
    const startBtnElement = document.getElementById("start-btn");
    if (startBtnElement.textContent == "Start") {
      document.getElementById("start-btn").classList.remove("btn-primary");
      document.getElementById("start-btn").classList.add("btn-danger");
      startBtnElement.textContent = "Restart";
    }
    restartGame();
  });
  document.getElementById("green-btn").addEventListener("click", clickGreenBtn);
  document.getElementById("red-btn").addEventListener("click", clickRedBtn);
  document.getElementById("yellow-btn").addEventListener("click", clickYellowBtn);
  document.getElementById("blue-btn").addEventListener("click", clickBlueBtn);
  for (let element of document.getElementsByClassName("new-game-btn")) {
    element.addEventListener("click", restartGame);
  }
})
