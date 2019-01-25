const drumPadButtons = {
  "Q": {
    buttonId: "Heater-1",
    timerId: 0
  },
  "W": {
    buttonId: "Heater-2",
    timerId: 0
  },
  "E": {
    buttonId: "Heater-3",
    timerId: 0
  },
  "A": {
    buttonId: "Heater-4",
    timerId: 0
  },
  "S": {
    buttonId: "Clap",
    timerId: 0
  },
  "D": {
    buttonId: "Open-HH",
    timerId: 0
  },
  "Z": {
    buttonId: "Kick-n-Hat",
    timerId: 0
  },
  "X": {
    buttonId: "Kick",
    timerId: 0
  },
  "C": {
    buttonId: "Closed-HH",
    timerId: 0
  }
};


function changePadLook(buttonKey) {
  clearTimeout(drumPadButtons[buttonKey].timerId);
  const padElement = document.getElementById(drumPadButtons[buttonKey].buttonId);
  padElement.classList.add("activated");
  drumPadButtons[buttonKey].timerId = setTimeout(() => {
    padElement.classList.remove("activated");
  }, 1000);
}

function playSound(audioId) {
  const audioElement = document.getElementById(audioId);
  if (audioElement.currentTime >= 0.01 || audioElement.paused) {
    audioElement.currentTime = 0;
    audioElement.play();
  }
}

function padTriggered(audioId) {
  audioId = audioId.toUpperCase();
  changePadLook(audioId);
  document.getElementById("display").innerText = drumPadButtons[audioId].buttonId.replace(/-/g, " ");
  playSound(audioId);
}

document.addEventListener("DOMContentLoaded", () => {
  Object.keys(drumPadButtons).forEach((audioId) => {
    document
        .getElementById(drumPadButtons[audioId].buttonId)
        .addEventListener("click", () => padTriggered(audioId));
  });
  document.addEventListener("keydown", event => {
    const pressedKey = event.key.toUpperCase();
    if (Object.keys(drumPadButtons).includes(pressedKey)) {
      event.preventDefault();
      padTriggered(pressedKey);
    }
  });
});
