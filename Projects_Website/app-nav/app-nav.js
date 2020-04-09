class AppNav extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({mode: "open"});
    shadow.innerHTML = `
      <link rel="stylesheet" href="./Projects_Website/app-nav/app-nav.css">
      <nav>
        <h1><a id="title-link" href="#"><i class="fa fa-free-code-camp"></i> freeCodeCamp-Projects</a></h1>
        <div id="links"></div>
      </nav>
     `;
  }

  static get observedAttributes() {
    return ["certifications"];
  }

  get certifications() {
    return JSON.parse(this.getAttribute("certifications").replace(/'/g, "\""));
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "certifications") {
      this.shadowRoot.getElementById("links").innerHTML = "";
      for (const certification of this.certifications) {
        this.shadowRoot.getElementById("links").innerHTML += `
          <a href="#${certification.container_id}">${certification.name}</a>
        `;
      }
    }
  }
}

window.customElements.define("app-nav", AppNav);
