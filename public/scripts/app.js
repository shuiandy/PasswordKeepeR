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
  let copyText = document.getElementById("item-pass");
  console.log(copyText.innerText);
  navigator.clipboard.writeText(copyText.innerText);
  // alert("Copied the password!");
}