import "../project-card/project-card.js";

class CertificationSection extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({mode: "open"});

    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="./Projects_Website/certification-section/certification-section.css">
      <h2>${this.name}</h2>
      <p id="description">
        <slot name="description"></slot>
      </p>
      <div id="projects">
        ${this.projects.map(project => `
          <project-card name="${project.name}" link="${project.link}" sourcecode="${project.sourcecode}"></project-card>
        `).join("")}
      </div>
    `;
  }

  get name() {
    return this.getAttribute("name");
  }

  get projects() {
    return JSON.parse(this.getAttribute("projects").replace(/'/g, "\""));
  }
}

window.customElements.define("certification-section", CertificationSection);
