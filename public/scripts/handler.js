$(document).ready(function () {
  $('#reset-password-btn').on('click', function (event) {
    console.log(event);
    event.preventDefault();
    const newPass = $('#new-pass').val().trim();
    console.log(newPass);
    const repeatPass = $('#new-pass-repeat').val().trim();
    if (newPass !== repeatPass) {
      console.log('no');
      $('#pass-no-match').slideToggle();
    } else {
      $('#reset-pass')
        .submit()
        .done(function (data) {
          console.log(data);
          if (!data.success) {
            $('#wrong-pass').slideToggle();
          } else {
            window.location.replace('/logout');
          }
        });
    }
  });
  $('.form-card').on('submit', function (e) {
    const itemName = $('.detail-item-name').text().trim();
    const createTime = $('.hidden-created').text().trim();
    console.log(createTime);
    document.getElementById('item-name-val').value = itemName;
    document.getElementById('createTime-val').value = createTime;
    const formData = $('.form-card').serializeArray();
    console.log(formData);
  });
  $('#delete-item').click(function () {
    const itemName = $('#detail-item-name').text().trim();
    console.log(itemName);
    $.ajax({
      type: 'delete',
      url: '/api/item/' + itemName,
      data: { itemName: itemName },
    }).done(function (data) {
      if (data.success) {
        window.location.replace('/index');
      }
    });
  });
});
