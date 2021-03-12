document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("logout-btn").addEventListener("click", () => {
    clearCookies();
    window.location.replace(window.location.href);
  });
});
