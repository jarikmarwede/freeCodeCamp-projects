import CERTIFICATIONS from "./certifications.js";
import "./project-card/project-card.js";

function loadProjects() {
  for (
    let certificationIndex = 0;
    certificationIndex < CERTIFICATIONS.length;
    certificationIndex++
  ) {
    let certification = CERTIFICATIONS[certificationIndex];
    let currentProjects = certification.projects;

    for (let i = 0; i < currentProjects.length; i++) {
      const name = currentProjects[i].name;
      const link = currentProjects[i].link;
      const sourcecode = currentProjects[i].src;

      const container = document.getElementById(certification.container_id);
      container.innerHTML += `<project-card name="${name}" link="${link}" sourcecode="${sourcecode}"></project-card>`;
    }
  }
}

window.addEventListener(
  "DOMContentLoaded",
  function() {
    loadProjects();
  },
  false
);
