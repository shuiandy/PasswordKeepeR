const db = require('../connection');
const bcrypt = require('bcryptjs');

const checkUsername = (username) => {
  const usernameQueryString = `SELECT * FROM users WHERE username = $1`;
  return new Promise((resolve) => {
    db.query(usernameQueryString, [username]).then((data) => {
      resolve(data.rowCount === 0);
    });
  });
};

// TODO: check orgPass if user input an existing organization name
const checkOrg = async (org, orgPass) => {
  const findOrgNameString = 'SELECT * FROM organizations WHERE org_name = $1';
  return new Promise((resolve) => {
    db.query(findOrgNameString, [org]).then((data) => {
      // case 1: no such organization, create one
      if (data.rowCount === 0) {
        return resolve({ status: 0, info: 'No such organization' });
      }
      // case 2: wrong organization password
      else if (!bcrypt.compareSync(orgPass, data.rows[0].password)) {
        return resolve({ status: 1, info: 'Invalid Organization Password' });
      } else {
        // case 3: append user to organization
        const getOrgId = data.rows[0].id;
        return resolve({ status: 2, info: getOrgId });
      }
    });
  });
};
const userRegister = async (username, password, email, org, orgPass) => {
  const createOrgString = `INSERT INTO organizations (org_name, password, vault) VALUES($1, $2, ('{}'))`;
  const createUserString =
    'INSERT INTO users (username, email, password, org_id) VALUES($1, $2, $3, (SELECT id FROM organizations WHERE org_name = $4))';
  checkOrg(org, orgPass).then((result) => {
    if (result.status === 1) {
      return { success: false, info: 'Invalid organization password!' };
    } else if (result.status === 2) {
      return new Promise((resolve) => {
        db.query(createUserString, [username, email, password, org]).then(() => {
          return resolve({ success: true });
        });
      });
    } else {
      return new Promise((resolve) => {
        db.query(createOrgString, [org, bcrypt.hashSync(orgPass, 10)]).then(() => {
          db.query(createUserString, [username, email, password, org]).then(() => {
            return resolve({ success: true });
          });
        });
      });
    }
  });
};

const userLogin = (username, password) => {
  const queryString = 'SELECT * FROM users WHERE username = $1';
  return new Promise((resolve) => {
    db.query(queryString, [username]).then((result) => {
      if (!result.rows || !bcrypt.compareSync(password, result.rows[0].password)) {
        return resolve({ user_id: null, success: false, info: 'Invalid Username or Password!' });
      } else {
        const getUserVaultString =
          'SELECT users.*, organizations.org_name, organizations.vault FROM users JOIN organizations ON org_id = organizations.id WHERE users.username = $1 GROUP BY users.id, organizations.id';
        db.query(getUserVaultString, [username]).then((data) => {
          return resolve({
            user_id: data.rows[0].id,
            success: true,
            info: 'Login Success',
            org: data.rows[0].org_name,
            org_id: data.rows[0].org_id,
            vault: data.rows[0].vault,
          });
        });
      }
    });
  }).catch((err) => {
    console.log('userLoginError', err);
  });
};
module.exports = { checkUsername, checkOrg, userRegister, userLogin };
