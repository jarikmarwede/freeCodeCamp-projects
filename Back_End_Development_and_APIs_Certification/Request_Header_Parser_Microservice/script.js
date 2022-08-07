async function getAPIResponse() {
  const API_URL = "https://jm-freecodecamp-projects.herokuapp.com/request-header-parser-microservice/whoami";
  document.querySelector(".code-wrapper img").hidden = false;
  const response = await fetch(API_URL);
  document.querySelector(".code-wrapper img").hidden = true;
  document.getElementById("api-response").innerText = JSON.stringify(await response.json());
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("parse-headers-button").addEventListener("click", getAPIResponse);
});
