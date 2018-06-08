$(document).ready(function () {
  displayPolls();
});

function displayPolls() {
  const apiPollsPath = "/api/getpolls";
  
  $.getJSON(apiPollsPath, function(pollsArray) {
    let newHTML = "";
    
    for (let i = pollsArray.length - 1; i >= 0; i--) {
      let pollName = pollsArray[i]["poll-name"];
      
      if (i < 10) {
        newHTML += 
          "<div class=\"poll-btn\"> \
            <a class=\"poll-link text-center\" href=\"/poll/" + pollName +  "\"> \
              <h6>" + pollName + "</h6> \
            </a> \
          </div>";
      } else {
        newHTML += 
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
  });
};
