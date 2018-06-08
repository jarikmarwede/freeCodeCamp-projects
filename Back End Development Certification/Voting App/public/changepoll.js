var answers = 0;

function addPollAnswer(value="") {
  answers++;
  var newAnswer = "<input class=\"form-control answer\" type=\"text\" name=\"answer" + answers + "\" placeholder=\"answer" + answers + "\" pattern=\"^[a-zA-Z0-9_]*$\" required>";
  $("#poll-answers").append(newAnswer);
  $("#poll-answers, .answer:last").val(value);
}

function deleteLastAnswer() {
  if (answers > 2) {
    answers--;
    $(".answer:last").remove();
  }
}

function loadOldAnswers() {
  const pollName = decodeURIComponent(window.location.pathname.split("/")[window.location.pathname.split("/").length - 2]);
  const apiPath = "/api/getpoll/" + pollName;
  $.getJSON(apiPath, function(pollData) {
    $("#poll-answers").html("");
    for (let key in pollData["answers"]) {
      addPollAnswer(key);
    }
  });
}

$(document).ready(function() {
  loadOldAnswers();
  $("#add-answer-btn").on("click", function() {
    addPollAnswer();
  });
  $("#delete-answer-btn").on("click", function() {
    deleteLastAnswer();
  });
});
