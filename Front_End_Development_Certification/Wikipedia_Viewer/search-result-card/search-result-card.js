class SearchResultCard extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({mode: "open"});
    shadow.innerHTML = `
      <link rel="stylesheet" href="./search-result-card/search-result-card.css">
      <a href="${this.url}">
        <h3>${this.title}</h3>
        <p id="snippet">${this.snippet}...</p>
      </a>
    `;
  }

  get url() {
    return this.getAttribute("url");
  }

  get title() {
    return this.getAttribute("title");
  }

  get snippet() {
    return this.getAttribute("snippet").replace(/'/g, "\"");
  }
}

window.customElements.define("search-result-card", SearchResultCard);
