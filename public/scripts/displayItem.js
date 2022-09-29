const getItemDetail = (itemName) => {
  $(document).ready(function (e) {
    $.ajax({
      type: 'get',
      url: '/api/item/' + itemName,
    }).done(function (data) {
      const result = renderItem(data);
      $('#item-details').html(result);
    });
  });
  $('.items .list-item').on('click', function () {
    console.log('changed!');
    $('.items .list-item').removeClass('selected');
    $(this).addClass('selected');
  });
};

const renderItem = (data) => {
  console.log(data);
  const createdTime = timeConverter(data.vault.create_time);
  const lastModified = timeConverter(data.vault.last_modified);
  return `<div id="display-item" class="center">
  <header class="row">
    <img src="/resources/paimon.png" class="key-icon-item">
    <div class="detail-item-name" id="detail-item-name">${data.item}</div>
  </header>
  <table class="section-username-password table table-striped table-primary">
    <tbody>
      <tr class="field string">
        <td class="title first-col">
          <span class="section-name">username</span>
        </td>
        <td class="value string">
          <span class="value-username">${escapeChar(data.vault.username)}</input>
        </td>
      </tr>
      <tr class="field concealed">
        <td class="title first-col">
          <span class="section-name">password</span>
        </td>
        <td class="value string">
        <div class="input-group" id="show_hide_password">
          <input class="value-password" id="item-pass" type="password" size="20" value="${escapeChar(
            data.vault.password
          )}"></input>
        <button class="fa fa-eye-slash fa-xl" id="toggleShow"></button>
        <button class="fa fa-copy fa-xl" id="copyButton" onclick="copyPassword()"></button>
      </div>
        </td>
      </tr>
    </tbody>
  </table>
  <table class="section-websites table table-striped table-info">
    <tbody>
      <tr class="field URL new-field">
        <td class="title first-col">
          <span class="section-name">website</span>
        </td>
        <td class="value URL">
          <a class="display-website" href="${escapeChar(data.vault.website)}">
            <span>${escapeChar(data.vault.website)}</span>
          </a>
        </td>
      </tr>
      <tr class="field string new-field">
        <td class="title first-col">
          <span class="section-name">category</span>
        </td>
        <td class="category">
          <span class="display-category">${escapeChar(data.vault.category)}</span>
        </td>
      </tr>
    </tbody>
  </table>
      <table class="section-mod-time table table-striped table-warning">
      <tbody>
      <tr class="field string new-field">
        <td class="title first-col">
          <span class="section-name">last_modified</span>
        </td>
        <td class="last-modified">
          <span class="display-category">${lastModified}</span>
        </td>
      </tr>
      <tr class="field string new-field">
        <td class="title first-col">
          <span class="display-created">created</span>
        </td>
        <td class="created">
          <span class="display-created">${createdTime}</span>
        </td>
      </tr>
    </tbody>
  </table>
</div>
<div id="item-bar">
  <div class="edit-bar">
    <a href="javascript:void(0)" class="edit-item btn btn-outline-primary" role="button" data-bs-toggle="modal" data-bs-target="#modalEditItem">Edit</a>
    <a href="javascript:void(0)" class="edit-item btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#modalConfirmDelete" role="button">Delete</a>
    </div>
</div>`;
};
