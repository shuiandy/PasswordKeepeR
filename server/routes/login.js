'use strict';

const express = require('express');
const { checkLoginStatus } = require('../lib/helper');
const { insertNewItem } = require('../db/queries/items');
const router = express.Router();
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const cookieSession = require('cookie-session');
const { userRegister, checkUsername, userLogin } = require('../db/queries/users');

router.use(
  cookieSession({
    name: 'session',
    keys: ['tempKey'],
    maxAge: 24 * 60 * 60 * 1000,
  })
);
router.get('/', (req, res) => {
  return checkLoginStatus(req.session) ? res.redirect('/index') : res.redirect('/login');
});
router.get('/login', (req, res) => {
  return checkLoginStatus(req.session) ? res.redirect('/index') : res.render('login');
});

router.post('/signup', (req, res) => {
  if (checkLoginStatus(req.session)) {
    return res.redirect('/index');
  }
  const username = req.body.username;
  const email = req.body.userEmail;
  const password = bcrypt.hashSync(req.body.userPass, 10);
  const orgName = req.body.orgName;
  const orgPass = req.body.orgPass;
  checkUsername(username).then((result) => {
    if (!result) {
      return res.status(400).json({ status: 'failed', message: 'username is taken.' });
    }
    userRegister(username, password, email, orgName, orgPass).then((data) => {
      if (data && data.success) {
        res.redirect('/login');
      }
    });
  });
  // TODO: add session cookie
});

router.post('/logout', (req, res) => {
  res.clearCookie('session');
  return res.redirect('/');
});

router.post('/login', (req, res) => {
  if (checkLoginStatus(req.session)) {
    return res.redirect('/index');
  }
  const username = req.body.username;
  const password = req.body.password;
  userLogin(username, password).then((data) => {
    if (data.success) {
      req.session.user_id = data.user_id;
      //TODO transfer vault data to frontend
      res.status(200).json({ org: data.org_name, org_id: data.org_id, vault: data.vault });
      return res.redirect('/index');
    } else {
      return res.send('Invalid username of password!');
    }
  });
});

router.get('/index', (req, res) => {
  if (!checkLoginStatus(req.session)) {
    return res.redirect('/login');
  }
  res.render('index');
});

router.post('/api/new-item', (req, res) => {
  if (!checkLoginStatus(req.session)) {
    return res.send('Please login first!');
  }

  const itemName = req.body.itemName;
  const username = req.body.username;
  const password = req.body.password;
  const website = req.body.website;
  const category = req.body.category;
  const last_modified = Date.now();
  const create_time = Date.now();
  const vault_id = req.body.vault_id;
  insertNewItem(itemName, username, password, website, category, last_modified, create_time, vault_id);
});

module.exports = router;
