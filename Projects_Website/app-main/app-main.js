import CERTIFICATIONS from "../certifications.js";
import "../certification-section/certification-section.js";

const template = document.createElement("template");
template.innerHTML = `
  <main>
    <div class="introduction">
      <p>Here are all of the <a href="https://www.freecodecamp.org/jarikmarwede" target="_blank"><i class="fab fa-free-code-camp"></i> freeCodeCamp</a> projects I built for the <a href="https://www.freecodecamp.org/certification/jarikmarwede/responsive-web-design">Responsive Web Design Certification</a>, the <a href="https://www.freecodecamp.org/certification/jarikmarwede/javascript-algorithms-and-data-structures">JavaScript Algorithms and Data Structures Certification</a>, the <a href="https://www.freecodecamp.org/certification/jarikmarwede/front-end-development-libraries">Front End Development Libraries Certification</a>, the <a href="https://www.freecodecamp.org/certification/jarikmarwede/back-end-development-and-apis">Back End Development and APIs Certification</a>, the <a href="https://www.freecodecamp.org/certification/jarikmarwede/legacy-front-end" target="_blank"> Legacy Front End Certification</a> and the Legacy Back End Certification.</p>
      <p>The original projects are the ones that were committed first. So if you want to check out the code of when I first made them go to the <a href="https://github.com/jarikmarwede/freeCodeCamp-projects/commits/master?after=6d3dd335f8bb9b19239d9b69ab628a86aded3e95+314">commit page</a>.</p>
    </div>
    <div id="certifications"></div>
  </main>
`;

class AppMain extends HTMLElement {
  constructor() {
    super();

    this.appendChild(template.content.cloneNode(true));

    document.getElementById("certifications").innerHTML = `
      ${CERTIFICATIONS.map(certification => `
        <certification-section id="${certification.container_id}">
          <span slot="title">${certification.name}</span>
          <span slot="description">${certification.description}</span>
        </certification-section>
      `).join("")}
    `;
    for (const certification of CERTIFICATIONS) {
      document.getElementById(certification["container_id"]).projects = certification.projects;
    }
  }
}

window.customElements.define("app-main", AppMain);
