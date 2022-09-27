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
  const pString = `'{"${itemName}": {"username": "${username}", "password": "${password}", "website": "${website}", "category": "${category}" , "last_modified": "${last_modified}", "create_time": "${create_time}"}}'`;
  const queryString = `UPDATE organizations SET vault = vault || ${pString}::jsonb WHERE id = $1 `;
  return db.query(queryString, [1]);
};
module.exports = { insertNewItem };
