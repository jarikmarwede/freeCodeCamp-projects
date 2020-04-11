class ChannelCard extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({mode: "open"});
    shadow.innerHTML = `
      <link rel="stylesheet" href="./channel-card/channel-card.css">
      <div id="main-channel-row">
        <img src="${this.logo}"  alt="Channel logo"/>
        <p id="channel-name">
          <a id="channel-link" href="${this.url}">${this.name}</a>
        </p>
      </div>
      <p id="stream-status">${ this.online ? this.game + ": " + this.status : ""}</p>
    `;
  }

  get online() {
    return this.hasAttribute("online");
  }

  get logo() {
    return this.getAttribute("logo");
  }

  get url() {
    return this.getAttribute("url");
  }

  get name() {
    return this.getAttribute("name")
  }

  get game() {
    return this.getAttribute("game");
  }

  get status() {
    return this.getAttribute("status");
  }
}
window.customElements.define("channel-card", ChannelCard);
