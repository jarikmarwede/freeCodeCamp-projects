async function submitForm(event) {
  event.preventDefault();

  let API_URL = event.target.action;
  let formData = new FormData(event.target);
  const requestOptions = {
    method: event.target.method,
    body: formData
  };

  const response = await fetch(API_URL, requestOptions);
  document.getElementById("api-response").innerText = JSON.stringify(await response.json());
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("upload-file-form").addEventListener("submit", submitForm);
});
