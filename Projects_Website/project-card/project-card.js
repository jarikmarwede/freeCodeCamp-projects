const template = document.createElement("template");
template.innerHTML = `
  <link rel="stylesheet" href="./Projects_Website/project-card/project-card.css">
  <h3 id="title"></h3>
  <div class='buttons'>
    <a id="project-link" class="link-btn" href='#'><p><i class='fa fa-desktop'></i> View</p></a>
    <a id="sourcecode-link" class="link-btn" href='#' target='_blank'><p><i class='fa fa-code'></i> Source</p></a>
  </div>
`;

class ProjectCard extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({mode: "open"});
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.shadowRoot.getElementById("title").innerText = this.name;
    this.shadowRoot.getElementById("project-link").href = this.link;
    this.shadowRoot.getElementById("sourcecode-link").href = this.sourcecode;
  }
  get name() {
    return this.getAttribute("name");
  }

  get link() {
    return this.getAttribute("link");
  }

  get sourcecode() {
    return this.getAttribute("sourcecode");
  }
}
window.customElements.define("project-card", ProjectCard);
