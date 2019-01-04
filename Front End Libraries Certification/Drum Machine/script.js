const drumPadButtons = {
  "Q": "Heater-1",
  "W": "Heater-2",
  "E": "Heater-3",
  "A": "Heater-4",
  "S": "Clap",
  "D": "Open-HH",
  "Z": "Kick-n-Hat",
  "X": "Kick",
  "C": "Closed-HH"
};

function playSound(audioId) {
  audioId = audioId.toUpperCase();
  const audioElement = document.getElementById(audioId);
  if (audioElement.currentTime >= 0.01 || audioElement.paused) {
    audioElement.currentTime = 0;
    audioElement.play();
  }
}

function padTriggered(audioId, buttonId) {
  playSound(audioId);
  document.getElementById("display").innerText = buttonId.replace(/-/g, " ");
}

document.addEventListener("DOMContentLoaded", () => {
  Object.entries(drumPadButtons).forEach(([audioId, buttonId]) => {
    document.getElementById(buttonId).addEventListener("click", () => padTriggered(audioId, buttonId));
  });
  document.addEventListener("keydown", event => {
    const pressedKey = event.key.toUpperCase();
    if (Object.keys(drumPadButtons).includes(pressedKey)) {
      event.preventDefault();
      playSound(pressedKey, drumPadButtons[pressedKey]);
    }
  });
});
