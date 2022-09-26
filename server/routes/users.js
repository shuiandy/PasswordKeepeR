/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const { checkLoginStatus } = require('../lib/helper');
// router.get('/', (req, res) => {
//   res.render('login');
// });

router.get('/users', (req, res) => {
  if (checkLoginStatus(req.session)) {
    return res.redirect('/users');
  }
});

router.post('/new', (req, res) => {

})

module.exports = router;
