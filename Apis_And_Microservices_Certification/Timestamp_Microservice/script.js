async function submitForm(event) {
  event.preventDefault();

  const API_URL = event.target.action + "/" + event.target[0].value;
  const requestOptions = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  document.querySelector(".code-wrapper img").hidden = false;
  const response = await fetch(API_URL, requestOptions);
  document.querySelector(".code-wrapper img").hidden = true;
  document.getElementById("api-response").innerText = JSON.stringify(await response.json());
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("get-timestamp-form").addEventListener("submit", submitForm);
});
