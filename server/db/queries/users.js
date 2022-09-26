const db = require('../connection');
const bcrypt = require('bcryptjs');

const checkUsername = (username) => {
  const usernameQueryString = `SELECT * FROM users WHERE username = $1`;
  return db
    .query(usernameQueryString, [username])
    .then((data) => {
      return data.rows ? data.rows[0] : null;
    })
    .catch((err) => {
      console.log('checkUsernameErr', err.message);
    });
};
// exports.checkUsername = checkUsername;
const checkOrg = (org, orgPass) => {
  const orgQueryString = 'SELECT * FROM organizations WHERE org_name = $1 AND password = $2';
  db.query(orgQueryString, [org, orgPass], (err, data) => {
    if (err) {
      console.log('Error finding orgQueryString', err);
    }
    if (!data.rows) {
      return { status: 0, info: '' };
    }
    if (data.rows && !bcrypt.compareSync(orgPass, data.rows[2])) {
      return { status: 1, info: 'Invalid Organization Password' };
    } else {
      const getOrgId = db.query('SELECT id FROM organizations WHERE org_name = $1', [org]);
      return { status: 2, info: getOrgId };
    }
  });
};
const userRegister = (username, password, email, org, orgPass) => {
  const createOrgString =
    'INSERT INTO organizations (org_name, password, vault_id) VALUES($1, $2, (SELECT max(id) FROM vaults))';
  const createUserString =
    'INSERT INTO users (username, email, password, org_id) VALUES($1, $2, $3, (SELECT id FROM organizations WHERE org_name = $4))';
  const createNewVault = "INSERT INTO vaults (vault) VALUES('')";
  db.query(createNewVault, () => {
    db.query(createOrgString, [org, orgPass], () => {
      db.query(createUserString, [username, email, password, org]);
    });
  });
};

const userLogin = (username, password) => {
  const queryString = 'SELECT password FROM users WHERE username = $1';
  return db
    .query(queryString, [username])
    .then((result) => {
      if (!result.rows || !bcrypt.compareSync(password, result.rows[0].password)) {
        return { success: false, info: 'Invalid Username or Password!' };
      } else {
        return { success: true, info: 'Login Success' };
      }
    })
    .catch((err) => {
      console.log('userLoginError', err);
    });
};
module.exports = { checkUsername, checkOrg, userRegister, userLogin };
