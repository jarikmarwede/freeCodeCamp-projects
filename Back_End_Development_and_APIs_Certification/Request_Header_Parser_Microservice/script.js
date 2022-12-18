async function getAPIResponse() {
  const API_URL = "/.netlify/functions/Request_Header_Parser_Microservice";
  document.querySelector(".code-wrapper img").hidden = false;
  const response = await fetch(API_URL);
  document.querySelector(".code-wrapper img").hidden = true;
  document.getElementById("api-response").innerText = JSON.stringify(await response.json());
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("parse-headers-button").addEventListener("click", getAPIResponse);
});
