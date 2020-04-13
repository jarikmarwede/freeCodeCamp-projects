import "./drum-pad/drum-pad.js";

const drumPadButtons = [
  {
    key: "q",
    soundName: "Heater-1",
    sound: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
  },
  {
    key: "w",
    soundName: "Heater-2",
    sound: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
  },
  {
    key: "e",
    soundName: "Heater-3",
    sound: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
  },
  {
    key: "a",
    soundName: "Heater-4",
    sound: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
  },
  {
    key: "s",
    soundName: "Clap",
    sound: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
  },
  {
    key: "d",
    soundName: "Open-HH",
    sound: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
  },
  {
    key: "z",
    soundName: "Kick-n-Hat",
    sound: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
  },
  {
    key: "x",
    soundName: "Kick",
    sound: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
  },
  {
    key: "c",
    soundName: "Closed-HH",
    sound: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
  }
];

function loadDrumPads() {
  for (let index = 0; index < drumPadButtons.length; index++) {
    const buttonData = drumPadButtons[index];
    document.getElementById("drum-pads").innerHTML += `
      <drum-pad sound-src="${buttonData.sound}">${buttonData.key.toUpperCase()}</drum-pad>
    `;
  }
  for (const element of document.getElementsByTagName("drum-pad")) {
    element.addEventListener("activated", event => {
      const index = Array.from(document.querySelectorAll("drum-pad")).findIndex(element => element === event.target);
      document.getElementById("display").innerText = drumPadButtons[index].soundName;
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadDrumPads();
  document.addEventListener("keydown", event => {
    for (let index = 0; index < drumPadButtons.length; index++) {
      if (drumPadButtons[index].key === event.key) {
        document.getElementsByTagName("drum-pad")[index].activateDrumPad().then();
      }
    }
  });
});
