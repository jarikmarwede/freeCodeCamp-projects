function addPollEventHandlers() {
  for (const deleteModalButton of document.getElementsByClassName("delete-modal-btn")) {
    deleteModalButton.addEventListener("click", event => {
      $(event.target).closest(".poll-btn").find(".modal").modal();
    })
  }

  for (const deleteButton of document.getElementsByClassName("delete-btn")) {
    deleteButton.addEventListener("click", event => {
      const pollName = $(event.target).closest(".poll-btn").find(".poll-name").text();
      deletePoll(pollName);
      $(event.target).closest(".modal").modal("hide");
    })
  }
}

function showMorePolls() {
  const polls = document.getElementById("created-polls").children;
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

async function deletePoll(pollName) {
  const apiPollPath = "/api/deletepoll/" + pollName;
  await fetch(apiPollPath);

  location.reload();
}

document.addEventListener("DOMContentLoaded", () => {
  addPollEventHandlers();
  document.getElementById("load-more-btn").addEventListener("click", showMorePolls);
});
