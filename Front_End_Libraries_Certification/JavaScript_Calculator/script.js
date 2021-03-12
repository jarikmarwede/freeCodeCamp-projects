function clearOutput() {
  document.getElementById("main-output").innerText = "0";
  document.getElementById("full-output").innerText = "0";
}

function clearLast() {
  const fullOutput = document.getElementById("full-output");
  const mainOutput = document.getElementById("main-output");

  if (fullOutput.innerText.length <= 1) {
    clearOutput();
  } else {
    fullOutput.innerText = fullOutput.innerText.slice(0, fullOutput.innerText.length - 1);
    mainOutput.innerText = fullOutput.innerText[fullOutput.innerText.length - 1];
  }
}

function addNumber(number) {
  const fullOutput = document.getElementById("full-output");
  const mainOutput = document.getElementById("main-output");

  if (number === "." && mainOutput.innerText.indexOf(".") !== -1) {
    return;
  } else if (fullOutput.innerText.indexOf("=") !== -1) {
    clearOutput();
  }
  const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  if (
      numbers.indexOf(mainOutput.innerText[mainOutput.children.length - 1]) !== -1 ||
      mainOutput.innerText[mainOutput.children.length - 1] === "." ||
      (mainOutput.innerText.length === 1 && numbers.indexOf(mainOutput.innerText[0]) !== - 1)
  ) {
    let newText = mainOutput.innerText + number;
    while (newText[0] === "0" && newText.length > 1 && newText[1] !== ".") {
      newText = newText.slice(1);
    }
    mainOutput.innerText = newText;
  } else {
    mainOutput.innerText = number;
  }
  fullOutput.innerText += number;
  while (fullOutput.innerText[0] === "0" && fullOutput.innerText.length > 1 && numbers.indexOf(fullOutput.innerText[1]) !== -1) {
    fullOutput.innerText = fullOutput.innerText.slice(1);
  }
}

function addSymbol(symbol) {
  const fullOutput = document.getElementById("full-output");
  const mainOutput = document.getElementById("main-output");
  const operations = ["+", "-", "*", "/"];

  if (operations.indexOf(mainOutput.innerText[0]) !== -1) {
    return;
  } else if (fullOutput.innerText.indexOf("=") !== -1) {
    clearOutput();
  }
  mainOutput.innerText = symbol;
  fullOutput.innerText += symbol;
}

function evaluate() {
  const fullOutput = document.getElementById("full-output");
  const mainOutput = document.getElementById("main-output");

  const result = eval(fullOutput.innerText);
  mainOutput.innerText = result;
  fullOutput.innerText += "=" + result;
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("ac-btn").addEventListener("click", clearOutput);
  document.getElementById("delete-btn").addEventListener("click", clearLast);

  for (const button of document.getElementsByClassName("number-btn")) {
    button.addEventListener("click", event => {
      addNumber(event.target.innerText);
    });
  }
  for (const button of document.getElementsByClassName("operation-btn")) {
    button.addEventListener("click", event => {
      if (event.target.innerText === "÷")
        addSymbol("/");
      else if (event.target.innerText === "X")
        addSymbol("*");
      else
        addSymbol(event.target.innerText);
    });
  }
  document.getElementById("equal-btn").addEventListener("click", evaluate);
})
