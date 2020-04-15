import "../project-card/project-card.js";

const template = document.createElement("template");
template.innerHTML = `
  <link rel="stylesheet" href="./Projects_Website/certification-section/certification-section.css">
  <h2>
    <slot name="title"></slot>
  </h2>
  <p id="description">
    <slot name="description"></slot>
  </p>
  <div id="projects"></div>
`;

class CertificationSection extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({mode: "open"});
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    for (const project of this.projects) {
      this.shadowRoot.getElementById("projects").innerHTML += `
        <project-card link="${project.link}" sourcecode="${project.src}">
          <span slot="title">${project.name}</span>
        </project-card>
      `;
    }
  }

  get projects() {
    return JSON.parse(this.getAttribute("projects").replace(/'/g, "\""));
  }
}

window.customElements.define("certification-section", CertificationSection);
