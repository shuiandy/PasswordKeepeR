const jwt = require('jsonwebtoken');
const secret = 'tmpSecret';
const checkLoginStatus = (req) => {
  if (req.session && req.session.user_id && req.cookies['JWT_TOKEN']) {
    return true;
  } else {
    return false;
  }
};

const generateToken = (data) => {
  const payload = { user_id: data.user_id, org_name: data.org_name, org_id: data.org_id };
  const token = jwt.sign(payload, secret, { expiresIn: '1day' });
  return token;
};

const verifyToken = (req, res, next) => {
  let data = {};
  if (req.cookies['JWT_TOKEN']) {
    try {
      data = jwt.verify(req.cookies['JWT_TOKEN'], secret);
      req.userInfo = data;
    } catch (err) {
      throw new Error('bad token!');
    }
  }
  next();
};

module.exports = {
  checkLoginStatus,
  generateToken,
  verifyToken
};
