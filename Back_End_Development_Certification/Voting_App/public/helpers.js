function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  if (match) return match[2];
}

function clearCookies() {
  document.cookie = "session=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;secure";
  document.cookie = "username=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;secure";
}
