const checkLoginStatus = (session) => {
  if (session && session.user_id) {
    return true;
  } else {
    return false;
  }
};


module.exports = {
  checkLoginStatus,
  timeConverter,
};
