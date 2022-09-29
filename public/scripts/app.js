// Client facing scripts here
const timeConverter = (timestamp) => {
  const a = new Date(Number(timestamp));
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const year = a.getFullYear();
  const month = months[a.getMonth()];
  const date = a.getDate();
  const hour = a.getHours();
  const min = a.getMinutes() < 10 ? `0${a.getMinutes()}` : a.getMinutes();
  const sec = a.getSeconds() < 10 ? `0${a.getSeconds()}` : a.getSeconds();
  const time = `${date} ${month} ${year} ${hour}:${min}:${sec}`;
  return time;
};

const escapeChar = (str) => {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const copyPassword = () => {
  let copyText = $('#item-pass').val();
  console.log(copyText);
  navigator.clipboard.writeText(copyText);
};
$(document).ready(function () {
  $('#sidebar-container .list-group .sidebar-list-button').click(function () {
    $('#sidebar-container .list-group .sidebar-list-button').removeClass('selected');
    $(this).addClass('selected');
  });

  // $('#toggleShow').click(function (event) {
  //   event.preventDefault();
  //   console.log("mememe!");
  //   if ($('#show_hide_password input').attr('type') == 'text') {
  //     $('#show_hide_password input').attr('type', 'password');
  //     $('#show_hide_password i').addClass('fa-eye-slash');
  //     $('#show_hide_password i').removeClass('fa-eye');
  //   } else if ($('#show_hide_password input').attr('type') == 'password') {
  //     $('#show_hide_password input').attr('type', 'text');
  //     $('#show_hide_password i').removeClass('fa-eye-slash');
  //     $('#show_hide_password i').addClass('fa-eye');
  //   }
  // });
});
$(document).ready(function () {
  $('#show_hide_password #toggleShow').click(function (event) {
    console.log("mememe!");
    event.preventDefault();
    if ($('.field #show_hide_password input').attr('type') == 'text') {
      $('.field #show_hide_password input').attr('type', 'password');
      $('#show_hide_password #toggleShow').addClass('fa-eye-slash');
      $('#show_hide_password #toggleShow').removeClass('fa-eye');
    } else if ($('#show_hide_password input').attr('type') == 'password') {
      $('#show_hide_password input').attr('type', 'text');
      $('#show_hide_password #toggleShowi').removeClass('fa-eye-slash');
      $('#show_hide_password #toggleShowi').addClass('fa-eye');
    }
  }); 
});
