var computerSymbol = "o";
var playerSymbol = "x";
var computerSymbolHtml = "<i class=\"far fa-circle\"></i>";
var playerSymbolHtml = "<i class=\"fas fa-times\"></i>";


function changeSymbols(player, computer, playerHtml, computerHtml) {
  playerSymbol = player;
  computerSymbol = computer;
  playerSymbolHtml = playerHtml;
  computerSymbolHtml = computerHtml;
}

function computerTurn() {
  var cellChoice = undefined;
  var psh = playerSymbolHtml;
  var cell0 = $("#cell-0").html();
  var cell1 = $("#cell-1").html();
  var cell2 = $("#cell-2").html();
  var cell3 = $("#cell-3").html();
  var cell4 = $("#cell-4").html();
  var cell5 = $("#cell-5").html();
  var cell6 = $("#cell-6").html();
  var cell7 = $("#cell-7").html();
  var cell8 = $("#cell-8").html();
  var cells = [cell0, cell1, cell2, cell3, cell4, cell5, cell6, cell7, cell8];
  var emptyCells = [];
  for (var cellIndex = 0; cellIndex < cells.length; cellIndex++) {
    if (cells[cellIndex] == "&nbsp;") {
      emptyCells.push(cellIndex);
    }
  }

  // vertical
  if (cell0 == psh && cell1 == psh) {
    cellChoice = 2;
  } else if (cell1 == psh && cell2 == psh && cell0 == "&nbsp;") {
    cellChoice = 0;
  } else if (cell0 == psh && cell2 == psh && cell1 == "&nbsp;") {
    cellChoice = 1;
  } else if (cell3 == psh && cell4 == psh && cell5 == "&nbsp;") {
    cellChoice = 5;
  } else if (cell4 == psh && cell5 == psh && cell3 == "&nbsp;") {
    cellChoice = 3;
  } else if (cell3 == psh && cell5 == psh && cell4 == "&nbsp;") {
    cellChoice = 4;
  } else if (cell6 == psh && cell7 == psh && cell8 == "&nbsp;") {
    cellChoice = 8;
  } else if (cell7 == psh && cell8 == psh && cell6 == "&nbsp;") {
    cellChoice = 6;
  } else if (cell6 == psh && cell8 == psh && cell7 == "&nbsp;") {
    cellChoice = 7;
  }
  // horizontal
  else if (cell0 == psh && cell3 == psh && cell6 == "&nbsp;") {
    cellChoice = 6;
  } else if (cell3 == psh && cell6 == psh && cell0 == "&nbsp;") {
    cellChoice = 0;
  } else if (cell0 == psh && cell6 == psh && cell3 == "&nbsp;") {
    cellChoice = 3;
  } else if (cell1 == psh && cell4 == psh && cell7 == "&nbsp;") {
    cellChoice = 7;
  } else if (cell4 == psh && cell7 == psh && cell1 == "&nbsp;") {
    cellChoice = 1;
  } else if (cell1 == psh && cell7 == psh && cell4 == "&nbsp;") {
    cellChoice = 4;
  } else if (cell2 == psh && cell5 == psh && cell8 == "&nbsp;") {
    cellChoice = 8;
  } else if (cell5 == psh && cell8 == psh && cell2 == "&nbsp;") {
    cellChoice = 2;
  } else if (cell2 == psh && cell8 == psh && cell5 == "&nbsp;") {
    cellChoice = 5;
  }
  // diagonal
  else if (cell0 == psh && cell4 == psh && cell8 == "&nbsp;") {
    cellChoice = 8;
  } else if (cell4 == psh && cell8 == psh && cell0 == "&nbsp;") {
    cellChoice = 0;
  } else if (cell0 == psh && cell8 == psh && cell4 == "&nbsp;") {
    cellChoice = 4;
  } else if (cell6 == psh && cell4 == psh && cell2 == "&nbsp;") {
    cellChoice = 2;
  } else if (cell4 == psh && cell2 == psh && cell6 == "&nbsp;") {
    cellChoice = 6;
  } else if (cell2 == psh && cell6 == psh && cell4 == "&nbsp;") {
    cellChoice = 4;
  } else {
    var emptyCellIndex = Math.floor((Math.random() * emptyCells.length));
    cellChoice = emptyCells[emptyCellIndex];
  }
  $("#cell-" + cellChoice).html(computerSymbolHtml);
}

function checkForWin() {
  var symbols = [playerSymbolHtml, computerSymbolHtml];
  var cell0 = $("#cell-0").html();
  var cell1 = $("#cell-1").html();
  var cell2 = $("#cell-2").html();
  var cell3 = $("#cell-3").html();
  var cell4 = $("#cell-4").html();
  var cell5 = $("#cell-5").html();
  var cell6 = $("#cell-6").html();
  var cell7 = $("#cell-7").html();
  var cell8 = $("#cell-8").html();
  var winnerHtml = undefined;
  for (var symbolIndex = 0; symbolIndex < symbols.length; symbolIndex++) {
    var symbol = symbols[symbolIndex];
    if ((cell0 == symbol && cell1 == symbol && cell2 == symbol) || (cell3 == symbol && cell4 == symbol && cell5 == symbol) || (cell6 == symbol && cell7 == symbol && cell8 == symbol) || (cell0 == symbol && cell3 == symbol && cell6 == symbol) || (cell1 == symbol && cell4 == symbol && cell7 == symbol) || (cell2 == symbol && cell5 == symbol && cell8 == symbol) || (cell0 == symbol && cell4 == symbol && cell8 == symbol) || (cell2 == symbol && cell4 == symbol && cell6 == symbol)) {
      winnerHtml = symbol;
      break;
    }
  }
  if (winnerHtml == computerSymbolHtml) {
    $("#computer-win-count").text(parseInt($("#computer-win-count").text()) + 1)
    clearPlayingBoard();
    $("#winner-sentence").text("You lose!");
    $("#winner-modal").modal();
    return true;
  } else if (winnerHtml == playerSymbolHtml) {
    $("#player-win-count").text(parseInt($("#player-win-count").text()) + 1)
    clearPlayingBoard();
    $("#winner-sentence").text("You win!");
    $("#winner-modal").modal();
    return true;
  } else if (cell0 != "&nbsp;" && cell1 != "&nbsp;" && cell2 != "&nbsp;" && cell3 != "&nbsp;" && cell4 != "&nbsp;" && cell5 != "&nbsp;" && cell6 != "&nbsp;" && cell7 != "&nbsp;" && cell8 != "&nbsp;") {
    clearPlayingBoard();
    $("#winner-sentence").text("It's a draw!");
    $("#winner-modal").modal();
    return true;
  }
  return false;
}

function reset() {
  clearPlayingBoard();
  $("#player-win-count").text(0);
  $("#computer-win-count").text(0);
  $("#symbol-modal").modal();
}

function clearPlayingBoard() {
  $("#cell-0").html("&nbsp;");
  $("#cell-1").html("&nbsp;");
  $("#cell-2").html("&nbsp;");
  $("#cell-3").html("&nbsp;");
  $("#cell-4").html("&nbsp;");
  $("#cell-5").html("&nbsp;");
  $("#cell-6").html("&nbsp;");
  $("#cell-7").html("&nbsp;");
  $("#cell-8").html("&nbsp;");
}


$("document").ready(function() {
  $("#symbol-modal").modal();
  $("#symbol-o-btn").on("click", function() {
    changeSymbols("o", "x", "<i class=\"far fa-circle\"></i>", "<i class=\"fas fa-times\"></i>");
  });
  $("#symbol-x-btn").on("click", function() {
    changeSymbols("x", "o", "<i class=\"fas fa-times\"></i>", "<i class=\"far fa-circle\"></i>");
  });
  $(".game-cell").on("click", function() {
    if ($(this).html() == "&nbsp;") {
      $(this).html(playerSymbolHtml);
      if (checkForWin() === false) {
        computerTurn();
        checkForWin();
      }
    }
  });
  $("#reset-btn").on("click", function() {
    reset();
  })
})