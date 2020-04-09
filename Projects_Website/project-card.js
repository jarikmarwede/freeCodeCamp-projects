class ProjectCard extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({mode: "open"});
    shadow.innerHTML = `
      <h3>${this.name}</h3>
      <div class='buttons'>
        <a class="link-btn" href='${this.link}'><p><i class='fa fa-desktop'></i> View</p></a>
        <a class="link-btn" href='${this.sourcecode}' target='_blank'><p><i class='fa fa-code'></i> Source</p></a>
      </div>
      <script async src="https://kit.fontawesome.com/1259fe3150.js" crossorigin="anonymous"></script>
      <style>
      @import "https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css";
      @import "./Projects_Website/style.css";
      :host {
        align-items: center;
        border: 1px solid var(--primary-color);
        border-radius: 5px;
        box-shadow: 4px 4px 6px 2px var(--primary-color);
        display: flex;
        flex-flow: column nowrap;
        margin: 2vmax 0;
        padding: 1vmax;
      }
      h3 {
        flex-grow: 1;
      }
      .buttons {
        display: flex;
        flex-flow: row nowrap;
      }
      </style>
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
