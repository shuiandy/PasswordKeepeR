/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const { checkLoginStatus } = require('../../lib/auth');
const { insertNewItem, editItem, deleteItem, getVault } = require('../../db/queries/items');
router.post('/api/new-item', (req, res) => {
  if (!checkLoginStatus(req)) {
    return res.send('Please login first!');
  }

  const itemName = req.body.itemName;
  const username = req.body.username;
  const password = req.body.password;
  const website = req.body.website;
  const category = req.body.category;
  const last_modified = Date.now();
  const create_time = Date.now();
  const org_id = req.userInfo.org_name;
  insertNewItem(itemName, username, password, website, category, last_modified, create_time, org_id).then(
    (data) => {
      getVault(org_id).then((vault) => {
        if (vault) {
          res.redirect('/index');
        }
      });
    }
  );
});
router.put('/item/:name', (req, res) => {
  if (!checkLoginStatus(req)) {
    return res.send('Please login first!');
  }
})
router.delete('/item/:name', (req, res) => {
  if (!checkLoginStatus(req)) {
    return res.send('Please login first!');
  }
  deleteItem(req.item_name, 'test').then(() => {
    return res.redirect('/index');
  });
});
module.exports = router;
