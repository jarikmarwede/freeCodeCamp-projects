async function submitForm(event) {
  event.preventDefault();

  let formData = new FormData(event.target);
  const requestOptions = {
    method: event.target.method,
    body: formData
  };

  const response = await fetch(event.target.action, requestOptions);
  document.getElementById("api-response").innerText = JSON.stringify(await response.json());
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("upload-file-form").addEventListener("submit", submitForm);
});
