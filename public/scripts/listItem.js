const renderVault = (items) => {
  let result = '';
  Object.values(items).forEach((content) => {
    const item = listItems(content);
    result += item;
  });
  $(document).ready(function () {
    $('#item-list'.item-list).html(result);
  });
};

const listItems = (item) => {
  const itemName = item.itemName;
  const escape = (str) => {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  return `<tr class="show-item"><td class="title"><span class="item-name">${escape(
    itemName
  )}</span></td></tr>`;
};
