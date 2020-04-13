class ProjectCard extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({mode: "open"});

    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="./Projects_Website/project-card/project-card.css">
      <h3>${this.name}</h3>
      <div class='buttons'>
        <a class="link-btn" href='${this.link}'><p><i class='fa fa-desktop'></i> View</p></a>
        <a class="link-btn" href='${this.sourcecode}' target='_blank'><p><i class='fa fa-code'></i> Source</p></a>
      </div>
    `;
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
