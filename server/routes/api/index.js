'use strict';
const express = require('express');
const { checkLoginStatus, verifyToken } = require('../../lib/auth');
const { getVault } = require('../../db/queries/db_items');
const router = express.Router();
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { userRegister, checkUsername } = require('../../db/queries/auth_db');
router.use(verifyToken);
router.post('/signup', (req, res) => {
  if (checkLoginStatus(req)) {
    return res.redirect('/index');
  }
  const username = req.body.username;
  const email = req.body.userEmail;
  const password = bcrypt.hashSync(req.body.userPass, 10);
  const orgName = req.body.orgName.toString();
  const orgPass = req.body.orgPass;
  checkUsername(username).then((result) => {
    if (!result) {
      return res.status(400).json({ status: 'failed', message: 'username is taken.' });
    }
    userRegister(username, password, email, orgName, orgPass).then((data) => {
      res.redirect('/login');
    });
  });
});
router.get('/index', (req, res) => {
  if (!checkLoginStatus(req)) {
    return res.redirect('/login');
  }
  getVault(req.userInfo.org_name).then((data) => {
    const userData = {
      vault: data.vault,
      org_name: req.userInfo.org_name,
      count: data.vault.length,
    };
    res.render('index', userData);
  });
});
module.exports = router;
