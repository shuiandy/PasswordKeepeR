'use strict';
const express = require('express');
const { checkLoginStatus, verifyToken } = require('../../lib/auth');
const { getVault } = require('../../db/queries/db_items');
const router = express.Router();
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const {
  userLogin,
  userRegister,
  checkUsername,
  resetPassword,
} = require('../../db/queries/auth_db');
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
      // if (data && data.success) {
      //   res.redirect('/login');
      // } else if (data && !data.success && data.status === 1) {
      //   return res.status(401).send("Invalid Organization password, please try again!");
      // } else if (data && !data.success && data.status === 2) {
      //   return res.status(401).send("error");
      // }
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
      username: req.userInfo.username,
      count: data.vault.length,
    };
    res.render('index', userData);
  });
});
router.post('/reset-password', (req, res) => {
  if (!checkLoginStatus(req)) {
    return res.send({ success: false, info: 'Please login first!' });
  }
  const username = req.userInfo.username;
  const password = req.body.password;
  const newPassword = req.body.newPassword;
  userLogin(username, password).then((data) => {
    if (data && data.success) {
      resetPassword(username, newPassword).then((data) => {
        if (data && data.success) {
          return res.redirect('/logout');
        } else {
          return res.json({ success: false, info: 'reset pass failed' });
        }
      });
    } else {
      return res.json({ success: false, info: 'wrong password' });
    }
  });
});
module.exports = router;
