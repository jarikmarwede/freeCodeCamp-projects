function getCookie(name) {
  var cookies = document.cookie.split("; ");
  for (var i = 0; i < cookies.length; i++) {
    if (cookies[i].split("=")[0] == name) {
      return cookies[i].split("=")[1];
    }
  }
  return "";
}

function clearCookies() {
  document.cookie = "session=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";
  document.cookie = "username=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";
}

function loggedOut() {
  $("#logged-in-list").hide();
  $("#login-form").show();
}

function loggedIn() {
  $("#login-form").hide();
  $("#logged-in-form").show();
}

$(document).ready(function () {
  const session = getCookie("session");
  const username = getCookie("username");
  
  if (session && username) {
    loggedIn();
  } else {
    loggedOut();
  }
  
  $("#logout-btn").on("click", function() {
    clearCookies();
    window.location.replace(window.location.href);
  });
});
