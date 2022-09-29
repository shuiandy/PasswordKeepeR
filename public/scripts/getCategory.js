const getCategory = (category) => {
  $(document).ready(function (e) {
    $.ajax({
      type: 'get',
      url: '/api/category/' + category,
    }).done(function (data) {
    //   console.log(data);
    //   console.log(data.vault.length)
    //   if (data.vault.length === 0) {
    //     return $('#no-item').html(`<div class="no-item">
    // <h1>Your vault has nothing, why not adding one?</h1>
    // </div>`);
    //   }
      let result = '';
      Object.values(data.vault).forEach((content) => {
        const items = renderCategory(content);
        result += items;
      });
      $('#items-ul').html(result);
    });
  });
};

const getAllItems = (org_name) => {
  $(document).ready(function (e) {
    $.ajax({
      type: 'get',
      url: '/api/' + org_name,
    }).done(function (data) {
      let result = '';
      Object.values(data.vault).forEach((content) => {
        const items = renderCategory(content);
        result += items;
      });
      $('#items-ul').html(result);
    });
  });
};

const renderCategory = (data) => {
  if (!data) {
    return ``;
  }
  return `<li class="items">
              <button class="list-item" id="${data.item}" onclick="getItemDetail(this.id)">
                <div class="item-icon">
                  <i class="fa fa-lock fa-xl"></i>
                </div>
                <div class="item-info">
                  <span class="title" name="item-name" value="${data.item}">
                    <h3>
                      ${data.item}
                    </h3>
                  </span>
                  <span class="title-username">
                    <h4>
                      ${data.vault.username}
                    </h4>
                  </span>
                </div>
              </button>
            </li>`;
};
