const checkLoginStatus = (session) => {
  if (session && session.user_id) {
    return true;
  } else {
    return false;
  }
};

const timeConverter = (timestamp) => {
  const a = new Date(timestamp * 1000);
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
module.exports = {
  checkLoginStatus,
  timeConverter,
};
