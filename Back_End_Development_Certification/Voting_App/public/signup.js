document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("signup-form").addEventListener("submit", event => {
    if (document.getElementById("password1").innerText !== document.getElementById("password2").innerText) {
      $("#password2").popover("show");
      event.preventDefault();
      window.setTimeout(() => {$("#password2").popover("hide");}, 4000);
    }
  });
});
