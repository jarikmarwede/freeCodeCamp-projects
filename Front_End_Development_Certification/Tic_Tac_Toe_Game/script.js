let computerSymbol = "o";
let playerSymbol = "x";
let computerSymbolHtml = "<i class=\"far fa-circle\"></i>";
let playerSymbolHtml = "<i class=\"fas fa-times\"></i>";


function changeSymbols(player, computer, playerHtml, computerHtml) {
  playerSymbol = player;
  computerSymbol = computer;
  playerSymbolHtml = playerHtml;
  computerSymbolHtml = computerHtml;
}

function computerTurn() {
  let cellChoice;
  const psh = playerSymbolHtml;
  const cell0 = document.getElementById("cell-0").innerHTML;
  const cell1 = document.getElementById("cell-1").innerHTML;
  const cell2 = document.getElementById("cell-2").innerHTML;
  const cell3 = document.getElementById("cell-3").innerHTML;
  const cell4 = document.getElementById("cell-4").innerHTML;
  const cell5 = document.getElementById("cell-5").innerHTML;
  const cell6 = document.getElementById("cell-6").innerHTML;
  const cell7 = document.getElementById("cell-7").innerHTML;
  const cell8 = document.getElementById("cell-8").innerHTML;
  const cells = [cell0, cell1, cell2, cell3, cell4, cell5, cell6, cell7, cell8];
  const emptyCells = [];
  for (let cellIndex = 0; cellIndex < cells.length; cellIndex++) {
    if (cells[cellIndex] === "&nbsp;") {
      emptyCells.push(cellIndex);
    }
  }

  // vertical
  if (cell0 === psh && cell1 === psh) {
    cellChoice = 2;
  } else if (cell1 === psh && cell2 === psh && cell0 === "&nbsp;") {
    cellChoice = 0;
  } else if (cell0 === psh && cell2 === psh && cell1 === "&nbsp;") {
    cellChoice = 1;
  } else if (cell3 === psh && cell4 === psh && cell5 === "&nbsp;") {
    cellChoice = 5;
  } else if (cell4 === psh && cell5 === psh && cell3 === "&nbsp;") {
    cellChoice = 3;
  } else if (cell3 === psh && cell5 === psh && cell4 === "&nbsp;") {
    cellChoice = 4;
  } else if (cell6 === psh && cell7 === psh && cell8 === "&nbsp;") {
    cellChoice = 8;
  } else if (cell7 === psh && cell8 === psh && cell6 === "&nbsp;") {
    cellChoice = 6;
  } else if (cell6 === psh && cell8 === psh && cell7 === "&nbsp;") {
    cellChoice = 7;
  }
  // horizontal
  else if (cell0 === psh && cell3 === psh && cell6 === "&nbsp;") {
    cellChoice = 6;
  } else if (cell3 === psh && cell6 === psh && cell0 === "&nbsp;") {
    cellChoice = 0;
  } else if (cell0 === psh && cell6 === psh && cell3 === "&nbsp;") {
    cellChoice = 3;
  } else if (cell1 === psh && cell4 === psh && cell7 === "&nbsp;") {
    cellChoice = 7;
  } else if (cell4 === psh && cell7 === psh && cell1 === "&nbsp;") {
    cellChoice = 1;
  } else if (cell1 === psh && cell7 === psh && cell4 === "&nbsp;") {
    cellChoice = 4;
  } else if (cell2 === psh && cell5 === psh && cell8 === "&nbsp;") {
    cellChoice = 8;
  } else if (cell5 === psh && cell8 === psh && cell2 === "&nbsp;") {
    cellChoice = 2;
  } else if (cell2 === psh && cell8 === psh && cell5 === "&nbsp;") {
    cellChoice = 5;
  }
  // diagonal
  else if (cell0 === psh && cell4 === psh && cell8 === "&nbsp;") {
    cellChoice = 8;
  } else if (cell4 === psh && cell8 === psh && cell0 === "&nbsp;") {
    cellChoice = 0;
  } else if (cell0 === psh && cell8 === psh && cell4 === "&nbsp;") {
    cellChoice = 4;
  } else if (cell6 === psh && cell4 === psh && cell2 === "&nbsp;") {
    cellChoice = 2;
  } else if (cell4 === psh && cell2 === psh && cell6 === "&nbsp;") {
    cellChoice = 6;
  } else if (cell2 === psh && cell6 === psh && cell4 === "&nbsp;") {
    cellChoice = 4;
  } else {
    const emptyCellIndex = Math.floor((Math.random() * emptyCells.length));
    cellChoice = emptyCells[emptyCellIndex];
  }
  document.getElementById("cell-" + cellChoice).innerHTML = computerSymbolHtml;
}

function checkForWin() {
  const symbols = [playerSymbolHtml, computerSymbolHtml];
  const cell0 = document.getElementById("cell-0").innerHTML;
  const cell1 = document.getElementById("cell-1").innerHTML;
  const cell2 = document.getElementById("cell-2").innerHTML;
  const cell3 = document.getElementById("cell-3").innerHTML;
  const cell4 = document.getElementById("cell-4").innerHTML;
  const cell5 = document.getElementById("cell-5").innerHTML;
  const cell6 = document.getElementById("cell-6").innerHTML;
  const cell7 = document.getElementById("cell-7").innerHTML;
  const cell8 = document.getElementById("cell-8").innerHTML;
  let winnerHtml = undefined;
  for (const symbol of symbols) {
    if ((cell0 === symbol && cell1 === symbol && cell2 === symbol) ||
        (cell3 === symbol && cell4 === symbol && cell5 === symbol) ||
        (cell6 === symbol && cell7 === symbol && cell8 === symbol) ||
        (cell0 === symbol && cell3 === symbol && cell6 === symbol) ||
        (cell1 === symbol && cell4 === symbol && cell7 === symbol) ||
        (cell2 === symbol && cell5 === symbol && cell8 === symbol) ||
        (cell0 === symbol && cell4 === symbol && cell8 === symbol) ||
        (cell2 === symbol && cell4 === symbol && cell6 === symbol)) {
      winnerHtml = symbol;
      break;
    }
  }
  let winState = "";
  if (winnerHtml === computerSymbolHtml) {
    winState = "computer";
  } else if (winnerHtml === playerSymbolHtml) {
    winState = "player";
  } else if (cell0 !== "&nbsp;" && cell1 !== "&nbsp;" && cell2 !== "&nbsp;" && cell3 !== "&nbsp;" && cell4 !== "&nbsp;" && cell5 !== "&nbsp;" && cell6 !== "&nbsp;" && cell7 !== "&nbsp;" && cell8 !== "&nbsp;") {
    winState = "draw";
  }
  if (winState !== "") {
    if (winState === "computer") {
      document.getElementById("computer-win-count").textContent = (parseInt(document.getElementById("computer-win-count").textContent) + 1).toString();
      document.getElementById("winner-sentence").textContent = "You lose!";
    } else if (winState === "player") {
      document.getElementById("player-win-count").textContent = (parseInt(document.getElementById("player-win-count").textContent) + 1).toString();
      document.getElementById("winner-sentence").textContent = "You win!";
    } else {
      document.getElementById("winner-sentence").textContent = "It's a draw!";
    }
    clearPlayingBoard();
    $("#winner-modal").modal();
  }
  return winState !== "";
}

function reset() {
  clearPlayingBoard();
  document.getElementById("player-win-count").textContent = "0";
  document.getElementById("computer-win-count").textContent = "0";
  $("#symbol-modal").modal();
}

function clearPlayingBoard() {
  for (let index = 0; index < 9; index++) {
    document.getElementById("cell-" + index).innerHTML = "&nbsp;";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  $("#symbol-modal").modal();
  document.getElementById("symbol-o-btn").addEventListener("click", () => {
    changeSymbols("o", "x", "<i class=\"far fa-circle\"></i>", "<i class=\"fas fa-times\"></i>");
  });
  document.getElementById("symbol-x-btn").addEventListener("click", () => {
    changeSymbols("x", "o", "<i class=\"fas fa-times\"></i>", "<i class=\"far fa-circle\"></i>");
  });
  for (let element of document.getElementsByClassName("game-cell")) {
    element.addEventListener("click", (event) => {
      if (event.target.innerHTML === "&nbsp;") {
        event.target.innerHTML = playerSymbolHtml;
        if (!checkForWin()) {
          computerTurn();
          checkForWin();
        }
      }
    });
  }
  document.getElementById("reset-btn").addEventListener("click", reset);
});
