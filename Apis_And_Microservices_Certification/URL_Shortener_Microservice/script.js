async function submitForm(event) {
  event.preventDefault();
  document.querySelector(".code-wrapper img").hidden = false;

  const formData = new FormData(event.target);
  const requestOptions = {
    method: event.target.method,
    body: formData
  };

  const response = await fetch(event.target.action, requestOptions);
  document.querySelector(".code-wrapper img").hidden = true;
  document.getElementById("api-response").innerText = JSON.stringify(await response.json());
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("create-shortened-url-form").addEventListener("submit", submitForm);
});
