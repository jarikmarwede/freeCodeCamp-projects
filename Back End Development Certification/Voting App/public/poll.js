function randomColors(amount) {
  let colors = []
  for (let i = 0; i < amount; i++) {
    colors.push('#' + (Math.random().toString(16) + '0000000').slice(2, 8));
  }
  return colors
}

function loadPoll() {
  const pollName = decodeURIComponent(window.location.pathname.split("/")[window.location.pathname.split("/").length - 1]);
  $("#poll-title").text(pollName);
  const apiPath = "/api/getpoll/" + pollName;
  $.getJSON(apiPath, function(pollData) {
    $("#creator-name").text("By " + pollData.creator);
    
    let answerKeys = [];
    for (let answerKey in pollData.answers) {
      $("#answer-list").append("<option>" + answerKey + "</option>");
      answerKeys.push(answerKey);
    }
    let voteCounts = [];
    for (let answer in pollData.answers) {
      voteCounts.push(pollData.answers[answer]);
    }
    const chart = new Chart($("#poll-chart"), {
      type: 'doughnut',
      data: {
        labels: answerKeys,
        datasets: [{
          data: voteCounts,
          backgroundColor: randomColors(answerKeys.length)
        }]
      },
      options: {
        animation: {
          animateScale: true
        }
      }
    });
  });
}

$(document).ready(function() {
  loadPoll();
});
