const template = document.createElement("template");
template.innerHTML = `
  <link rel="stylesheet" href="./search-result-card/search-result-card.css">
  <a href="#">
    <h3>
      <slot name="title"></slot>
    </h3>
    <p id="snippet">
      <slot name="snippet"></slot>
      ...
    </p>
  </a>
`;

class SearchResultCard extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({mode: "open"});
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  static get observedAttributes() {
    return ["url"];
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "url") {
      this.shadowRoot.querySelector("a").href = newValue;
    }
  }

  get url() {
    return this.getAttribute("url");
  }
  set url(url) {
    this.setAttribute("url", url);
  }
}

window.customElements.define("search-result-card", SearchResultCard);
