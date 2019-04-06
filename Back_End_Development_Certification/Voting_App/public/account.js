async function deleteAccount() {
  const apiPath = "/api/user/" + getCookie("username");
  await fetch(apiPath, {
    method: "DELETE",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      xsrfFormValue: getCookie("xsrfFormValue")
    })
  });

  window.location.replace("/");
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("delete-account-button").addEventListener("click", deleteAccount);
});
