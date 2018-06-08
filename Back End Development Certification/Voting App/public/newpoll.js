var answers = 2;

function addPollAnswer() {
  answers++;
  var newAnswer = "<input class=\"form-control answer\" type=\"text\" name=\"answer" + answers + "\" placeholder=\"answer" + answers + "\" pattern=\"^[a-zA-Z0-9_]*$\" required>";
  $("#poll-answers").append(newAnswer);
}

function deleteLastAnswer() {
  if (answers > 2) {
    answers--;
    $(".answer:last").remove();
  }
}

$(document).ready(function() {
  $("#add-answer-btn").on("click", function() {
    addPollAnswer();
  });
  $("#delete-answer-btn").on("click", function() {
    deleteLastAnswer();
  });
});