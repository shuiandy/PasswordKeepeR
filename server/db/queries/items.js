const db = require('../connection');
const crypto = require('crypto');

// TODO: create or modify user's JSON vault
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
  vault_id
) => {
  const pString = `'{"${itemName}": {"item_name": "${itemName}", "username": "${username}", "password": "${password}", "website": "${website}", "category": "${category}" , "last_modified": "${last_modified}", "create_time": "${create_time}"}}'`;
  const queryString = `UPDATE organizations SET vault = vault || ${pString}::jsonb WHERE id = $1 `;
  return db.query(queryString, [1]);
};

const editItem = (itemName, request, vault_id) => {
  const pString = ``;
  const queryString = `UPDATE organizations SET vault=vault `
}

const deleteItem = (itemName, vault_id) => {
  const pString = `'{"${itemName}"}'`;
  const queryString = `UPDATE organizations SET vault=vault #- ${pString} WHERE id = $1 `;
  return db.query(queryString, [vault_id]);
}
module.exports = { insertNewItem, editItem, deleteItem };
