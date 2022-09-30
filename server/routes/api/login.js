'use strict';

const express = require('express');
const { checkLoginStatus, generateToken } = require('../../lib/auth');
const router = express.Router();
const crypto = require('crypto');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const { userLogin } = require('../../db/queries/auth_db');
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

router.get('/logout', (req, res) => {
  res.clearCookie('JWT_TOKEN');
  res.clearCookie('session');
  res.clearCookie('session.sig');
  return res.redirect('/login');
});

router.post('/login', (req, res) => {
  if (checkLoginStatus(req)) {
    return res.redirect('/index');
  }
  const username = req.body.username;
  const password = req.body.password;
  userLogin(username, password).then((data) => {
    if (data && data.success) {
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
