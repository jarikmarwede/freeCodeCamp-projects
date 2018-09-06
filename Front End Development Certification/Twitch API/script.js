function loadChannels() {
  const channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

  for (let i = 0; i < channels.length; i++) {
    $.getJSON("https://wind-bow.glitch.me/twitch-api/channels/" + channels[i], function(channelJSON,) {
      $.getJSON("https://wind-bow.glitch.me/twitch-api/streams/" + channelJSON.display_name, function(streamJSON) {
        if (streamJSON.stream === null) {
          $("#twitch-channels").append(
            '<div class="twitch-channel main-channel-row offline"> \
              <img class="channel-logo" src="' + channelJSON.logo + '" /> \
              <p class="channel-name"> \
                <a class="channel-link" href="' + channelJSON.url + '">' + channelJSON.display_name + '</a> \
              </p> \
            </div>');
        } else {
          $("#twitch-channels").append(
            '<div class="twitch-channel online"> \
              <div class="main-channel-row"> \
                <img class="channel-logo" src="' + channelJSON.logo + '" /> \
                <p class="channel-name"> \
                  <a class="channel-link" href="' + channelJSON.url + '">' + channelJSON.display_name + '</a> \
                </p> \
              </div> \
              <p class="stream-status">' + channelJSON.game + ': ' + channelJSON.status + '</p> \
            </div>');
        }
      })
    })
  }
}

$(document).ready(function() {
  $("#all-btn").on("click", function() {
    $("#online-btn").removeClass("active");
    $("#offline-btn").removeClass("active");
    $("#all-btn").addClass("active");
    $(".twitch-channel").show();
  })
  $("#online-btn").on("click", function() {
    $("#all-btn").removeClass("active");
    $("#offline-btn").removeClass("active");
    $("#online-btn").addClass("active");
    $(".offline").hide();
    $(".online").show();
  })
  $("#offline-btn").on("click", function() {
    $("#online-btn").removeClass("active");
    $("#all-btn").removeClass("active");
    $("#offline-btn").addClass("active");
    $(".online").hide();
    $(".offline").show();
  })

  loadChannels();
})
