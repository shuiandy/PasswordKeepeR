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
  $('#sidebar-container .list-group .sidebar-list-button').click(function () {
    $('#sidebar-container .list-group .sidebar-list-button').removeClass('selected');
    $(this).addClass('selected');
  });
  $('.pass-generator-button').click(function (e) {
    e.preventDefault();
    $('.pass-gen').slideToggle();
  });
});
