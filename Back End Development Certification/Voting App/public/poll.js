function randomColors(amount) {
  let colors = [];
  for (let i = 0; i < amount; i++) {
    colors.push('#' + (Math.random().toString(16) + '0000000').slice(2, 8));
  }
  return colors
}

async function loadPoll() {
  const pollName = decodeURIComponent(window.location.pathname.split("/")[window.location.pathname.split("/").length - 1]);
  const apiPath = "/api/getpoll/" + pollName;

  const response = await fetch(apiPath);
  const pollData = await response.json();
  new Chart(document.getElementById("poll-chart"), {
    type: 'doughnut',
    data: {
      labels: Object.keys(pollData.answers),
      datasets: [{
        data: Object.values(pollData.answers),
        backgroundColor: randomColors(Object.keys(pollData.answers).length)
      }]
    },
    options: {
      animation: {
        animateScale: true
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  await loadPoll();
});
