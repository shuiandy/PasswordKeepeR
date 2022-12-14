/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const { checkLoginStatus } = require('../../lib/auth');
const {
  insertNewItem,
  editItem,
  deleteItem,
  getVault,
  getItemDetail,
  getCategory,
} = require('../../db/queries/db_items');

router.post('/api/new-item', (req, res) => {
  if (!checkLoginStatus(req)) {
    return res.send('Please login first!');
  }

  const itemName = req.body.itemName;
  const username = req.body.username;
  const password = req.body.password;
  const website = req.body.website;
  const category = req.body.category;
  const org_name = req.userInfo.org_name;
  const last_modified = Date.now();
  const create_time = Date.now();

  insertNewItem(
    itemName,
    username,
    password,
    website,
    category,
    last_modified,
    create_time,
    org_name
  ).then((data) => {
    if (data.rowCount === 1) {
      return res.redirect('/index');
    }
  });
});
router.get('/api/item/:name', (req, res) => {
  if (!checkLoginStatus(req)) {
    return res.send('Please login first!');
  }
  getItemDetail(req.params.name, req.userInfo.org_name).then((data) => {
    if (data.success) {
      return res.send(data.vault);
    }
  });
});
router.post('/api/item', (req, res) => {
  if (!checkLoginStatus(req)) {
    return res.send('Please login first!');
  }
  const itemName = req.params.itemName;
  const username = req.body.username;
  const password = req.body.password;
  const website = req.body.website;
  const category = req.body.category;
  const create_time = req.body.createTime;
  const last_modified = Date.now();
  // const create_time = req.body.create_time;
  const org_id = req.userInfo.org_name;
  editItem(
    itemName,
    username,
    password,
    website,
    category,
    last_modified,
    create_time,
    org_id
  ).then((data) => {
      return res.redirect('/index');
  });
});
router.delete('/api/item/:name', (req, res) => {
  if (!checkLoginStatus(req)) {
    return res.send('Please login first!');
  }
  deleteItem(req.params.name, req.userInfo.org_name).then((data) => {
    return res.send(data);
  });
});
router.get('/api/category/:name', (req, res) => {
  if (!checkLoginStatus(req)) {
    return res.send('Please login first!');
  }
  getCategory(req.params.name, req.userInfo.org_name).then((data) => {
    if (data.success) {
      const userData = { org_name: req.userInfo.org_name, vault: data.vault };
      return res.send(userData);
    }
  });
});
router.get('/api/:name', (req, res) => {
  if (!checkLoginStatus(req)) {
    return res.send('Please login first!');
  }
  getVault(req.userInfo.org_name).then((data) => {
    const userData = {
      vault: data.vault,
      org_name: req.userInfo.org_name,
      count: data.vault.length,
    };
    res.send(userData);
  });
});
module.exports = router;
