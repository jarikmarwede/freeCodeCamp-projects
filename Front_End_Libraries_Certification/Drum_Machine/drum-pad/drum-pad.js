class DrumPad extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({mode: "open"});

    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="./drum-pad/drum-pad.css">
      <button id="drum-pad"><slot></slot></button>
      <audio src="${this.soundSrc}"></audio>
    `;
  }

  connectedCallback() {
    this.shadowRoot.querySelector("button").addEventListener("click", this.activateDrumPad.bind(this));
  }

  disconnectedCallback() {
    this.shadowRoot.querySelector("button").removeEventListener("click", this.activateDrumPad.bind(this));
  }

  get soundSrc() {
    return this.getAttribute("sound-src");
  }

  async activateDrumPad() {
    this.shadowRoot.dispatchEvent(new Event("activated", {composed: true}));
    this.shadowRoot.getElementById("drum-pad").classList.add("activated");
    const audioElement = this.shadowRoot.querySelector("audio");
    audioElement.currentTime = 0;
    audioElement.addEventListener("ended", () => {
      this.shadowRoot.querySelector("button").classList.remove("activated");
    });
    await audioElement.play();
  }
}

window.customElements.define("drum-pad", DrumPad);
