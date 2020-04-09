import "../project-card/project-card.js";

class CertificationSection extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({mode: "open"});
    shadow.innerHTML = `
      <link rel="stylesheet" href="./Projects_Website/certification-section/certification-section.css">
      <h2>${this.name}</h2>
      <p id="description">${this.description}</p>
      <div id="projects">`;
    for (const project of this.projects) {
      shadow.innerHTML += `<project-card name="${project.name}" link="${project.link}" sourcecode="${project.sourcecode}"></project-card>`;
    }
    shadow.innerHTML += `</div>`;
  }

  get name() {
    return this.getAttribute("name");
  }

  get description() {
    return this.getAttribute("description").replace(/'/g, "\"");
  }

  get projects() {
    return JSON.parse(this.getAttribute("projects").replace(/'/g, "\""));
  }
}

window.customElements.define("certification-section", CertificationSection);
