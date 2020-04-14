import CERTIFICATIONS from "./certifications.js";
import "./app-nav/app-nav.js";
import "./app-main/app-main.js";

function loadCertifications() {
  document.getElementsByTagName("app-nav")[0].setAttribute("certifications", JSON.stringify(CERTIFICATIONS).replace(/"/g, "'"));
}

window.addEventListener(
  "DOMContentLoaded",
  loadCertifications,
  false
);
