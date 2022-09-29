$(document).ready(function () {
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
});
