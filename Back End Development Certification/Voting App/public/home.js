const API_POLLS_PATH = "/api/getpolls";

function loadPolls() {
  $.getJSON(API_POLLS_PATH, (pollsArray) => {
    let newHTML = "";

    for (let i = pollsArray.length - 1; i >= 0; i--) {
      let pollName = pollsArray[i]["poll-name"];

      if (i > pollsArray.length - 11) {
        newHTML = newHTML +
          "<div class=\"poll-btn\"> \
            <a class=\"poll-link text-center\" href=\"/poll/" + pollName +  "\"> \
              <h6>" + pollName + "</h6> \
            </a> \
          </div>";
      } else {
        newHTML = newHTML +
          "<div class=\"poll-btn hidden\"> \
            <a class=\"poll-link text-center\" href=\"/poll/" + pollName +  "\"> \
              <h6>" + pollName + "</h6> \
            </a> \
          </div>";
      }
    }
    if (newHTML == "") {
      newHTML += "<h3 class=\"text-center\">No polls found!</h3>";
    }
    $("#poll-list").html(newHTML);
    if (pollsArray.length > 10) {
      $("#load-more-btn").show();
    }
  });
};

function showMorePolls() {
  const polls = $("#poll-list").children();
  const visiblePollAmount = $("#poll-list").children(":not(.hidden)").length;
  const startIndex = visiblePollAmount;
  const endIndex = visiblePollAmount + 10;

  polls.slice(startIndex, endIndex).removeClass("hidden");
  if ($("#poll-list").children(".hidden").length === 0) {
    $("#load-more-btn").hide();
  }
};

$(document).ready(() => {
  $("#load-more-btn").hide();
  loadPolls();

  $("#load-more-btn").on("click", () => {
    showMorePolls();
  });
});
