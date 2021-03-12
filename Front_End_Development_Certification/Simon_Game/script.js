const buttons = [
  {
    regular: "#1d8424",
    flashing: "#2ffc3d",
    id: "green-btn",
    soundId: "green-sound",
    eventHandler: clickGreenBtn
  },
  {
    regular: "#8e2b22",
    flashing: "#fc2714",
    id: "red-btn",
    soundId: "red-sound",
    eventHandler: clickRedBtn
  },
  {
    regular: "#adab34",
    flashing: "#fcf800",
    id: "yellow-btn",
    soundId: "yellow-sound",
    eventHandler: clickYellowBtn
  },
  {
    regular: "#2777a3",
    flashing: "#0ca8fc",
    id: "blue-btn",
    soundId: "blue-sound",
    eventHandler: clickBlueBtn
  }
];
let currentSteps = [];
let fullSteps = [];

function newStep() {
  const countElement = document.getElementById("count");

  if (parseInt(countElement.textContent) >= 19) {
    $("#win-modal").modal();
  } else {
    const buttonChoice = Math.round(Math.random() * 3);
    fullSteps.push(buttonChoice);
    currentSteps = fullSteps.slice(0);
    countElement.textContent = (parseInt(countElement.textContent) + 1).toString();
    setTimeout(() => {flashColors(0)}, 800);
  }
}

function flashColors(index) {
  if (index === 0) {
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

function flashColor(index) {
  document.getElementById(buttons[index]["id"]).style.backgroundColor = buttons[index]["flashing"];
  setTimeout(resetColors, 800);
}

function deactivateBtns() {
  for (const button of buttons) {
    document.getElementById(button.id).removeEventListener("click", button.eventHandler);
  }
}

function activateBtns() {
  for (const button of buttons) {
    document.getElementById(button.id).addEventListener("click", button.eventHandler);
  }
}

function resetColors() {
  for (const button of buttons) {
    document.getElementById(button.id).style.backgroundColor = button.regular;
  }
}

function clickedBtn(id) {
  if (currentSteps[0] === id) {
    playSound(id);
    flashColor(id);
    currentSteps.shift();
    if (currentSteps.length === 0) {
      newStep();
    }
  } else {
    mistake();
    if (document.getElementById("strict-mode").checked) {
      restartGame();
    } else {
      setTimeout(() => {flashColors(0)}, 1000);
    }
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
  for (let index = 0; index < 4; index++) {
    flashColor(index);
    playSound(index);
  }
}

function playSound(index) {
  document.getElementById(buttons[index].soundId).play();
}

function restartGame() {
  currentSteps = [];
  fullSteps = [];
  document.getElementById("count").textContent = "0";
  newStep();
}


document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("start-btn").addEventListener("click", () => {
    const startBtnElement = document.getElementById("start-btn");
    if (startBtnElement.textContent === "Start") {
      document.getElementById("start-btn").classList.remove("btn-primary");
      document.getElementById("start-btn").classList.add("btn-danger");
      startBtnElement.textContent = "Restart";
    }
    restartGame();
  });
  activateBtns();
  for (const element of document.getElementsByClassName("new-game-btn")) {
    element.addEventListener("click", restartGame);
  }
})
