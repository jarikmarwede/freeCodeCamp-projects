import CERTIFICATIONS from "./certifications.js";
import "./app-nav/app-nav.js";
import "./certification-section/certification-section.js";

function loadCertifications() {
  document.getElementsByTagName("app-nav")[0].setAttribute("certifications", JSON.stringify(CERTIFICATIONS).replace(/"/g, "'"));
  for (const certification of CERTIFICATIONS) {
    const descriptionString = certification.description.replace(/"/g, "'");
    const projectsString = JSON.stringify(certification.projects).replace(/"/g, "'");
    document.getElementById("certifications").innerHTML += `
      <certification-section id="${certification.container_id}" name="${certification.name}" description="${descriptionString}" projects="${projectsString}"></certification-section>
    `;
  }
}

window.addEventListener(
  "DOMContentLoaded",
  loadCertifications,
  false
);
