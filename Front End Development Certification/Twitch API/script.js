function loadChannels() {
  var channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
  for (var i = 0; i < channels.length; i++) {
    $.getJSON("https://wind-bow.glitch.me/twitch-api/channels/" + channels[i], function(channelJSON,) {
      $.getJSON("https://wind-bow.glitch.me/twitch-api/streams/" + channelJSON.display_name, function(streamJSON) {
        if (streamJSON.stream === null) {
          $("#twitch-channels").append("<div class=\"twitch-channel offline\"><img class=\"img-thumbnail rounded-circle channel-logo\" src=\"" + channelJSON.logo + "\"></img><a class=\"channel-link\" href=\"" + channelJSON.url + "\" target=\"_blank\"><h3 class=\"channel-name\">" + channelJSON.display_name + "</h3></a></div>");
        } else {
          $("#twitch-channels").append("<div class=\"twitch-channel online\"><img class=\"img-thumbnail rounded-circle channel-logo\" src=\"" + channelJSON.logo + "\"></img><a class=\"channel-link\" href=\"" + channelJSON.url + "\" target=\"_blank\"><h3 class=\"channel-name\">" + channelJSON.display_name + "</h3></a><p class=\"stream-status\">" + channelJSON.game + ": " + channelJSON.status + "</p></div>");
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