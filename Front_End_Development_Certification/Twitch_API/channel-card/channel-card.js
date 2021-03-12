const template = document.createElement("template");
template.innerHTML = `
  <link rel="stylesheet" href="./channel-card/channel-card.css">
  <a href="#">
    <div id="main-channel-row">
      <img src=""  alt="Channel logo"/>
      <p id="channel-name"><slot name="name"></slot></p>
    </div>
    <p id="stream-status"></p>
  </a>
`;

class ChannelCard extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({mode: "open"});
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  static get observedAttributes() {
    return ["online", "url", "logo", "game", "status"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "online" || name === "game" || name === "status") {
      this.shadowRoot.getElementById("stream-status").innerText = this.online ? this.game + ": " + this.status : "";
    } else if (name === "url") {
      this.shadowRoot.querySelector("a").href = newValue;
    } else if (name === "logo") {
      this.shadowRoot.querySelector("img").src = newValue;
    }
  }

  get online() {
    return this.hasAttribute("online");
  }
  set online(online) {
    if (online)
      this.setAttribute("online", "");
    else
      this.removeAttribute("online");
  }

  get logo() {
    return this.getAttribute("logo");
  }
  set logo(logo) {
    this.setAttribute("logo", logo);
  }

  get url() {
    return this.getAttribute("url");
  }
  set url(url) {
    this.setAttribute("url", url);
  }

  get game() {
    return this.getAttribute("game");
  }
  set game(game) {
    this.setAttribute("game", game);
  }

  get status() {
    return this.getAttribute("status");
  }
  set status(status) {
    this.setAttribute("status", status);
  }
}
window.customElements.define("channel-card", ChannelCard);
