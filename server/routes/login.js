'use strict';

const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
  res.render('index');
});

router.post('/login', (req, res) => {
  res.render('index');
});
router.get('/register', (req, res) => {
  if (checkLoginStatus(req.session)) {
    return res.redirect('/users');
  }
});

router.post('/logout', (req, res) => {
  res.clearCookie('session');
  return res.redirect('/');
});

router.post('/login', (req, res) => {});
module.exports = router;
