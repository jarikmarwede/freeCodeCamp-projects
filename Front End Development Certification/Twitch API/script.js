async function loadChannels() {
  const channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

  for (let i = 0; i < channels.length; i++) {
    const channelsAPIURL = "https://wind-bow.glitch.me/twitch-api/channels/" + channels[i];
    const channelResponse = await fetch(channelsAPIURL)
    const channelJSON = await channelResponse.json();
    const streamAPIURL = "https://wind-bow.glitch.me/twitch-api/streams/" + channelJSON.display_name;
    const streamResponse = await fetch(streamAPIURL)
    const streamJSON = await streamResponse.json();

    if (streamJSON.stream === null) {
      document.getElementById("twitch-channels").innerHTML +=
        '<div class="twitch-channel main-channel-row offline"> \
          <img class="channel-logo" src="' + channelJSON.logo + '" /> \
          <p class="channel-name"> \
            <a class="channel-link" href="' + channelJSON.url + '">' + channelJSON.display_name + '</a> \
          </p> \
        </div>';
    } else {
      document.getElementById("twitch-channels").innerHTML +=
        '<div class="twitch-channel online"> \
          <div class="main-channel-row"> \
            <img class="channel-logo" src="' + channelJSON.logo + '" /> \
            <p class="channel-name"> \
              <a class="channel-link" href="' + channelJSON.url + '">' + channelJSON.display_name + '</a> \
            </p> \
          </div> \
          <p class="stream-status">' + channelJSON.game + ': ' + channelJSON.status + '</p> \
        </div>';
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("all-btn").addEventListener("click", () => {
    document.getElementById("online-btn").classList.remove("active");
    document.getElementById("offline-btn").classList.remove("active");
    document.getElementById("all-btn").classList.add("active");
    for (const element of document.getElementsByClassName("online")) {
      element.style.display = "block";
    }
    for (const element of document.getElementsByClassName("offline")) {
      element.style.display = "flex";
    }
  })
  document.getElementById("online-btn").addEventListener("click", () => {
    document.getElementById("all-btn").classList.remove("active");
    document.getElementById("offline-btn").classList.remove("active");
    document.getElementById("online-btn").classList.add("active");
    for (const element of document.getElementsByClassName("offline")) {
      element.style.display = "none";
    }
    for (const element of document.getElementsByClassName("online")) {
      element.style.display = "block";
    }
  })
  document.getElementById("offline-btn").addEventListener("click", () => {
    document.getElementById("online-btn").classList.remove("active");
    document.getElementById("all-btn").classList.remove("active");
    document.getElementById("offline-btn").classList.add("active");
    for (const element of document.getElementsByClassName("online")) {
      element.style.display = "none";
    }
    for (const element of document.getElementsByClassName("offline")) {
      element.style.display = "flex";
    }
  })

  loadChannels();
})
