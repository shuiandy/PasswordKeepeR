'use strict';

const express = require('express');
const { checkLoginStatus, generateToken, getToken, cleanToken } = require('../../lib/auth');
const { getVault } = require('../../db/queries/items');
const router = express.Router();
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const { userRegister, checkUsername, userLogin } = require('../../db/queries/auth_db');
router.use(cookieParser());
router.use(
  cookieSession({
    name: 'session',
    keys: ['tempKey'],
    maxAge: 24 * 60 * 60 * 1000,
  })
);
router.get('/', (req, res) => {
  return checkLoginStatus(req) ? res.redirect('/index') : res.redirect('/login');
});
router.get('/login', (req, res) => {
  return checkLoginStatus(req) ? res.redirect('/index') : res.render('login');
});

router.post('/logout', (req, res) => {
  cleanToken(req);
  req.clearCookie();
  return res.redirect('/');
});

router.post('/login', (req, res) => {
  if (checkLoginStatus(req)) {
    return res.redirect('/index');
  }
  const username = req.body.username;
  const password = req.body.password;
  userLogin(username, password).then((data) => {
    if (data.success) {
      const token = generateToken(data);
      res.cookie('JWT_TOKEN', token);
      req.session.user_id = data.user_id;
      return res.redirect('/index');
    } else {
      return res.status(401).send('Invalid username of password!');
    }
  });
});

module.exports = router;
