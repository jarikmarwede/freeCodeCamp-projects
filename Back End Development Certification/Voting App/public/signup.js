$(document).ready(function() {
  $("#signup-form").submit(function(e) {
    if ($("#password1").val() === $("#password2").val()) {
      return;
    } else {
      $("#password2").popover("show");
      e.preventDefault();
      window.setTimeout(function() {$("#password2").popover("hide");}, 4000);
    }
  });
});
