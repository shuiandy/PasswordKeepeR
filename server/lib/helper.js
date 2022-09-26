const checkLoginStatus = (session) => !!(session && session.user_id);

module.exports = {
  checkLoginStatus,
};
