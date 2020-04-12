import CERTIFICATIONS from "./certifications.js";
import "./app-nav/app-nav.js";
import "./certification-section/certification-section.js";

function loadCertifications() {
  document.getElementsByTagName("app-nav")[0].setAttribute("certifications", JSON.stringify(CERTIFICATIONS).replace(/"/g, "'"));
  for (const certification of CERTIFICATIONS) {
    const projectsString = JSON.stringify(certification.projects).replace(/"/g, "'");
    document.getElementById("certifications").innerHTML += `
      <certification-section id="${certification.container_id}" name="${certification.name}" projects="${projectsString}">
        <div slot="description">${certification.description}</div>
      </certification-section>
    `;
  }
}

window.addEventListener(
  "DOMContentLoaded",
  loadCertifications,
  false
);
