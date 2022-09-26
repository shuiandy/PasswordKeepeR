$(document).ready(function () {
  $('#btn-signup').click(function (e) {
    e.preventDefault();
    $('.form-signin').toggle(); // display:block or none
    $('.form-signup').toggle(); // display:block or none
  });
  $('#cancel_signup').click(function (e) {
    e.preventDefault();
    $('.form-signin').toggle(); // display:block or none
    $('.form-signup').toggle(); // display:block or none
  });
});
