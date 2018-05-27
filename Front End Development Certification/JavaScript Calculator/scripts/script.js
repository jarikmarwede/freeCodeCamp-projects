function clearOutput() {
  $("#main-output").text("0");
  $("#full-output").text("0");
}

function clearLast() {
  if ($("#full-output").text().length <= 1) {
    return null;
  }
  $("#full-output").text($("#full-output").text().slice(0, $("#full-output").text().length - 1));
  $("#main-output").text($("#full-output").text()[$("#full-output").text().length - 1]);
}

function addNumber(number) {
  if (number == "." && $("#main-output").text().indexOf(".") != -1) {
    return null;
  } else if ($("#full-output").text().indexOf("=") != -1) {
    clearOutput();
  }
  var numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  if (numbers.indexOf($("#main-output").text()[$("#main-output").length -1]) != -1 || $("#main-output").text()[$("#main-output").length -1] == "." || ($("#main-output").text().length == 1 && numbers.indexOf($("#main-output").text()[0]) != -1)) {
    var newText = $("#main-output").text() + number;
    while (newText[0] == "0" && newText.length > 1 && newText[1] != ".") {
      newText = newText.slice(1);
    }
    $("#main-output").text(newText);
  } else {
    $("#main-output").text(number);
  }
  $("#full-output").text($("#full-output").text() + number);
  while ($("#full-output").text()[0] == "0" && $("#full-output").text().length > 1 && numbers.indexOf($("#full-output").text()[1]) != -1) {
    $("#full-output").text($("#full-output").text().slice(1));
  }
}

function addSymbol(symbol) {
  var operations = ["+", "-", "*", "/"];
  if (operations.indexOf($("#main-output").text()[0]) != -1) {
    return null;
  } else if ($("#full-output").text().indexOf("=") != -1) {
    clearOutput();
  }
  $("#main-output").text(symbol);
  $("#full-output").text($("#full-output").text() + symbol);
}

function evaluate() {
  var result = eval($("#full-output").text());
  $("#main-output").text(result);
  $("#full-output").text($("#full-output").text() + "=" + result);
}

$("document").ready(function() {
  $("#ac-btn").on("click", function() {
    clearOutput();
  });
  $("#delete-btn").on("click", function() {
    clearLast();
  });
  $(".number-btn").on("click", function() {
    var number = $(this).text();
    addNumber(number);
  });
  $(".operation-btn").on("click", function() {
    var operationSymbol = $(this).text();
    if (operationSymbol == "÷") {
      operationSymbol = "/";
    } else if (operationSymbol == "X") {
      operationSymbol = "*";
    }
    addSymbol(operationSymbol);
  });
  $("#equal-btn").on("click", function() {
    evaluate();
  })
})