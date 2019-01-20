function showMorePolls() {
  const polls = document.getElementById("poll-list").children;
  let visiblePollAmount = polls.length;
  for (const poll of polls) {
    if (poll.hidden) {
      visiblePollAmount--;
    }
  }
  const startIndex = visiblePollAmount;
  const endIndex = visiblePollAmount + 10;

  if (endIndex >= polls.length) {
    document.getElementById("load-more-btn").hidden = true;
  }
  for (let index = startIndex; index < endIndex && index < polls.length; index++) {
    polls[index].hidden = false;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("load-more-btn").addEventListener("click", showMorePolls);
});
