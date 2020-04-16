async function submitForm(event) {
  event.preventDefault();
  document.querySelector(".code-wrapper img").hidden = false;

  let API_URL = event.target.action;
  let formData = {};
  for (const element of event.target) {
    if (element.name && element.value) {
      formData[element.name] = element.value;
    }
  }

  const requestOptions = {
    method: event.target.method,
    headers: {
      "Content-Type": "application/json"
    }
  };
  if (event.target.method === "get") {
    API_URL += "?";
    for (const [key, value] of Object.entries(formData)) {
      API_URL += key + "=" + value + "&";
    }
  } else if (event.target.method === "post") {
    requestOptions.body = JSON.stringify(formData);
  }
  const response = await fetch(API_URL, requestOptions);
  document.querySelector(".code-wrapper img").hidden = true;
  document.getElementById("api-response").innerText = JSON.stringify(await response.json());
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("create-user-form").addEventListener("submit", submitForm);
  document.getElementById("add-exercise-form").addEventListener("submit", submitForm);
  document.getElementById("get-exercise-log-form").addEventListener("submit", submitForm);
});
