const db = require('../connection');
const crypto = require('crypto');
const { rejects } = require('assert');

// TODO: user's JSON vault should encrypted by a master key
// TODO: when user logged in to the account, vault should be decrypted by the master key
const insertNewItem = (
  itemName,
  username,
  password,
  website,
  category,
  last_modified,
  create_time,
  vault_name
) => {
  const queryString = `INSERT INTO ${vault_name} (item, category, vault) VALUES($1, $2, $3)`;
  const itemVault = `{"item_name": "${itemName}", "username": "${username}", "password": "${password}", "website": "${website}", "category": "${category}" , "last_modified": "${last_modified}", "create_time": "${create_time}"}`;
  return db.query(queryString, [itemName, category, itemVault]);
};

const editItem = (
  itemName,
  username,
  password,
  website,
  category,
  last_modified,
  create_time,
  vault_name
) => {
  const itemVault = `{"item_name": "${itemName}", "username": "${username}", "password": "${password}", "website": "${website}", "category": "${category}" , "last_modified": "${last_modified}", "create_time": "${create_time}"}`;
  const queryString = `UPDATE ${vault_name} SET vault=$1`;
  return db.query(queryString, [itemVault]);
};

const deleteItem = (itemName, org_name) => {
  const queryString = `DELETE FROM ${org_name} WHERE item = $1`;
  return new Promise((resolve, reject) => {
    db.query(queryString, [itemName])
      .then(() => {
        return resolve({ success: true });
      })
      .catch((err) => {
        return reject({ success: false });
      });
  });
};
const getVault = (org_name) => {
  return new Promise((resolve) => {
    db.query(`SELECT * FROM ${org_name}`).then((vault) => {
      return resolve({ vault: vault.rows });
    });
  });
};
const getItemDetail = (itemName, vaultName) => {
  const queryString = `SELECT * FROM ${vaultName} WHERE item = $1`;
  return new Promise((resolve, reject) => {
    db.query(queryString, [itemName])
      .then((vault) => {
        if (vault.rowCount === 0) {
          return reject({ success: false })
        }
        return resolve({ success: true, vault: vault.rows[0] });
      })
      .catch((err) => {
        return reject({ success: false });
      });
  });
};
const getCategory = (category, vault_name) => {
  const queryString = `SELECT * FROM ${vault_name} WHERE category = $1`;
  return new Promise((resolve) => {
    db.query(queryString, [category]).then((vault) => {
      return resolve({ success: true, vault: vault.rows });
    });
  });
};
module.exports = { insertNewItem, editItem, deleteItem, getVault, getCategory, getItemDetail };
