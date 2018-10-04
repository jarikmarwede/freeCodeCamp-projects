$(document).ready(() => {
  $("#signup-form").submit((e) => {
    if ($("#password1").val() === $("#password2").val()) {
      return;
    } else {
      $("#password2").popover("show");
      e.preventDefault();
      window.setTimeout(() => {$("#password2").popover("hide");}, 4000);
    }
  });
});
