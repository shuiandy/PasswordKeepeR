$(document).ready(function () {
  $('#inputItemName').on('submit', function (event) {
    // event.preventDefault();
    const itemName = $('#inputItemName').val().trim();
    $.ajax({
      type: 'post',
      url: '/api/new-item',
      data: {  data},
    }).done(function (data) {
      if (data.hasDuplicates) {
        alert('Do not duplicate items!');
      }
      if (data.redirect) {
        window.location.replace('/index');
      }
    });
  });

  $('#delete-item').click(function () {
    const itemName = $('#detail-item-name').text().trim();
    console.log(itemName);
    $.ajax({
      type: 'delete',
      url: '/api/item/' + itemName,
    }).done(function (data) {
      if (data.success) {
        window.location.replace('/index');
      }
    });
  });

  // $('.btn login_btn').click(function (event) {
  //   event.preventDefault();
  //   console.log("test1");

  // });
});
