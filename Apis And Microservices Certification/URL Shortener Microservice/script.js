async function submitForm(event) {
  event.preventDefault();

  const API_URL = event.target.action;
  const formData = new FormData(event.target);
  const requestOptions = {
    method: event.target.method,
    body: formData
  };

  const response = await fetch(API_URL, requestOptions);
  document.getElementById("api-response").innerText = JSON.stringify(await response.json());
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("create-shortened-url-form").addEventListener("submit", submitForm);
});
