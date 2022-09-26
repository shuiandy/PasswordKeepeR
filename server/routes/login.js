'use strict';

const express = require('express');
const checkLoginStatus = require('../lib/helper');
const router = express.Router();
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const cookieSession = require('cookie-session');
const { userRegister, checkUsername, checkOrg, userLogin } = require('../db/queries/users');

// router.use(
//   cookieSession({
//     name: 'session',
//     keys: [crypto.generateKey(32)],
//     maxAge: 24 * 60 * 60 * 1000,
//   })
// );
router.get('/', (req, res) => {
  if (checkLoginStatus) {
    return res.redirect('/login');
  } else {
    return res.redirect('/index');
  }
});
router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', (req, res) => {
  if (!checkLoginStatus) {
    return res.redirect('/index');
  }
  const username = req.body.username;
  const password = req.body.password;
  userLogin(username, password).then((data) => {
    console.log(data);
    res.render('index');
  });
});

router.post('/signup', (req, res) => {
  if (!checkLoginStatus) {
    return res.redirect('/index');
  }
  const username = req.body.username;
  const email = req.body.userEmail;
  const password = bcrypt.hashSync(req.body.userPass, 10);
  const orgName = req.body.orgName;
  const orgPass = req.body.orgPass;
  checkUsername(username).then((data) => {
    if (data) {
      return res.send('Username Already Exists!');
    }
  });
  userRegister(username, password, email, orgName, orgPass);
  res.redirect('/login');
});

router.post('/logout', (req, res) => {
  res.clearCookie('session');
  return res.redirect('/');
});

router.post('/login', (req, res) => {});

module.exports = router;
