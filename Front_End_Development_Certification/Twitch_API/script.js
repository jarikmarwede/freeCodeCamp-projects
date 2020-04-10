import "./channel-card/channel-card.js";

async function loadChannels() {
  const channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

  for (const channel of channels) {
    const channelsAPIURL = "https://wind-bow.glitch.me/twitch-api/channels/" + channel;
    const channelResponse = await fetch(channelsAPIURL);
    const channelJSON = await channelResponse.json();
    const streamAPIURL = "https://wind-bow.glitch.me/twitch-api/streams/" + channelJSON["display_name"];
    const streamResponse = await fetch(streamAPIURL);
    const streamJSON = await streamResponse.json();
    document.getElementById("twitch-channels").innerHTML += `
      <channel-card 
        ${streamJSON["stream"] ? "online" : ""}
        logo="${channelJSON["logo"]}" 
        url="${channelJSON["url"]}" 
        name="${channelJSON["display_name"]}" 
        game="${channelJSON["game"]}" 
        status="${channelJSON["status"]}">
       </channel-card>
    `;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("all-btn").addEventListener("click", () => {
    document.getElementById("online-btn").classList.remove("active");
    document.getElementById("offline-btn").classList.remove("active");
    document.getElementById("all-btn").classList.add("active");
    for (const card of document.getElementsByTagName("channel-card")) {
      card.style.display = "flex";
    }
  })
  document.getElementById("online-btn").addEventListener("click", () => {
    document.getElementById("all-btn").classList.remove("active");
    document.getElementById("offline-btn").classList.remove("active");
    document.getElementById("online-btn").classList.add("active");
    for (const card of document.getElementsByTagName("channel-card")) {
      card.style.display = card.hasAttribute("online") ? "flex" : "none";
    }
  })
  document.getElementById("offline-btn").addEventListener("click", () => {
    document.getElementById("online-btn").classList.remove("active");
    document.getElementById("all-btn").classList.remove("active");
    document.getElementById("offline-btn").classList.add("active");
    for (const card of document.getElementsByTagName("channel-card")) {
      card.style.display = card.hasAttribute("online") ? "none" : "flex";
    }
  })

  loadChannels().then();
})
