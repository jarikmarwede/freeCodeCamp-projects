function clearCookies() {
  document.cookie = "session=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";
  document.cookie = "username=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("logout-btn").addEventListener("click", () => {
    clearCookies();
    window.location.replace(window.location.href);
  });
});
