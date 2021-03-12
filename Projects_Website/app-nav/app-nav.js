import CERTIFICATIONS from "../certifications.js";

const template = document.createElement("template");
template.innerHTML = `
  <link rel="stylesheet" href="./Projects_Website/app-nav/app-nav.css">
  <nav>
    <h1><a id="title-link" href="#"><i class="fa fa-free-code-camp"></i> freeCodeCamp-Projects</a></h1>
    <div id="links"></div>
  </nav>
`;

class AppNav extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({mode: "open"});
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    for (const certification of CERTIFICATIONS) {
      this.shadowRoot.getElementById("links").innerHTML += `
          <a href="#${certification.container_id}">${certification.name}</a>
        `;
    }
  }
}

window.customElements.define("app-nav", AppNav);
