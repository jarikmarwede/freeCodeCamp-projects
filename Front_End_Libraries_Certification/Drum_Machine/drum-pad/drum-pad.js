class DrumPad extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({mode: "open"});

    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="./drum-pad/drum-pad.css">
      <slot></slot>
      <audio src="${this.soundSrc}"></audio>
    `;
  }

  connectedCallback() {
    if (!this.hasAttribute("role"))
      this.setAttribute("role", "button")
    if (!this.hasAttribute("tabindex"))
      this.setAttribute("tabindex", "0");
    this.addEventListener("click", this.activateDrumPad.bind(this));
  }

  disconnectedCallback() {
    this.removeEventListener("click", this.activateDrumPad.bind(this));
  }

  get soundSrc() {
    return this.getAttribute("sound-src");
  }

  get active() {
    return this.hasAttribute("active");
  }

  set active(value) {
    if (value)
      this.setAttribute("active", "");
    else
      this.removeAttribute("active");
  }

  async activateDrumPad() {
    this.shadowRoot.dispatchEvent(new Event("activated", {composed: true}));
    this.active = true;
    const audioElement = this.shadowRoot.querySelector("audio");
    audioElement.currentTime = 0;
    audioElement.addEventListener("ended", () => {
      this.active = false;
    });
    await audioElement.play();
  }
}

window.customElements.define("drum-pad", DrumPad);
