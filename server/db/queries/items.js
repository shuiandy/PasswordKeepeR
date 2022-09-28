const db = require('../connection');
const crypto = require('crypto');

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
  const queryString = `INSERT INTO ${vault_name} (item, vault) VALUES($1, $2)`;
  const itemVault = `{"item_name": "${itemName}", "username": "${username}", "password": "${password}", "website": "${website}", "category": "${category}" , "last_modified": "${last_modified}", "create_time": "${create_time}"}`;
  return db.query(queryString, [itemName, itemVault]);
};

const editItem = (itemName, request, vault_id) => {
  const pString = ``;
  const queryString = `UPDATE organizations SET vault=vault `;
};

const deleteItem = (itemName, org_name) => {
  const queryString = `DELETE FROM ${org_name} WHERE item = $1`;
  return db.query(queryString, [itemName]);
};

const getVault = (org_name) => {
  return new Promise((resolve) => {
    db.query(`SELECT * FROM ${org_name}`).then((vault) => {
      return resolve({ vault: vault.rows });
    });
  });
};
module.exports = { insertNewItem, editItem, deleteItem, getVault };
