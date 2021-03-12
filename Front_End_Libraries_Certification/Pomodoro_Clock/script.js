let countingDown = false;
let intervalVar = null;

function updateTime() {
  const timeElement = document.getElementById("time");
  const oldTime = timeElement.textContent;
  let minutes = parseInt(oldTime.split(":")[0]);
  let seconds = parseInt(oldTime.split(":")[1]);

  if (seconds === 0) {
    if (minutes < 1) {
      changeStatus();
      return;
    } else {
      minutes -= 1;
      seconds = 59;
    }
  } else {
    seconds -= 1;
  }
  let newTime = minutes + ":";
  if (seconds < 10) {
    newTime += "0" + seconds;
  } else {
    newTime += seconds;
  }
  timeElement.textContent = newTime;
  updateProgressBar(minutes, seconds);
}

function updateProgressBar(minutes, seconds) {
  const maxTime = document.getElementById("status").textContent === "Session" ? parseInt(document.getElementById("session-length").textContent) * 60 : parseInt(document.getElementById("break-length").textContent) * 60;
  const timePassed = maxTime - (minutes * 60 + seconds);
  const percentage = timePassed / maxTime * 100;

  document.getElementById("progress-bar").style.width = percentage + "%";
}

function changeStatus() {
  const statusElement = document.getElementById("status");

  deactivateCounting();
  if (statusElement.textContent === "Session") {
    statusElement.textContent = "Break";
    document.getElementById("time").textContent = document.getElementById("break-length").textContent + ":00";
  } else {
    statusElement.textContent = "Session";
    document.getElementById("time").textContent = document.getElementById("session-length").textContent + ":00";
  }
  activateCounting();
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
  document.getElementById("status").textContent = "Session";
  document.getElementById("time").textContent = document.getElementById("session-length").textContent + ":00";
  document.getElementById("progress-bar").style.width = "0%";
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("minus-session").addEventListener("click", () => {
    const sessionLengthElement = document.getElementById("session-length");
    const sessionLength = parseInt(sessionLengthElement.textContent);

    if (sessionLength > 1) {
      sessionLengthElement.textContent = (sessionLength - 1).toString();
      reset();
    }
  });
  document.getElementById("plus-session").addEventListener("click", () => {
    const sessionLengthElement = document.getElementById("session-length");
    sessionLengthElement.textContent = (parseInt(sessionLengthElement.textContent) + 1).toString();
    reset();
  });
  document.getElementById("minus-break").addEventListener("click", () => {
    const breakLengthElement = document.getElementById("break-length");
    if (parseInt(breakLengthElement.textContent) >= 2) {
      breakLengthElement.textContent = (parseInt(breakLengthElement.textContent) - 1).toString();
      reset();
    }
  });
  document.getElementById("plus-break").addEventListener("click", () => {
    const breakLengthElement = document.getElementById("break-length");
    breakLengthElement.textContent = (parseInt(breakLengthElement.textContent) + 1).toString();
    reset();
  });
  document.getElementById("progress-bar-container").addEventListener("click", toggleCounting);
  document.getElementById("reset-btn").addEventListener("click", reset);
})
