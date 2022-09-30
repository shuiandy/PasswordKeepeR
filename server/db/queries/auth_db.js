const db = require('../connection');
const bcrypt = require('bcryptjs');

const checkUsername = (username) => {
  const usernameQueryString = `SELECT * FROM users WHERE username = $1`;
  return new Promise((resolve, reject) => {
    db.query(usernameQueryString, [username])
      .then((data) => {
        resolve(data.rowCount === 0);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// TODO: check orgPass if user input an existing organization name
const checkOrg = async (org, orgPass) => {
  const findOrgNameString = 'SELECT * FROM organizations WHERE org_name = $1';
  return new Promise((resolve, reject) => {
    db.query(findOrgNameString, [org])
      .then((data) => {
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
      })
      .catch((err) => {
        return reject({ status: 3, info: err });
      });
  });
};
const userRegister = async (username, password, email, org, orgPass) => {
  const org_name = `${org}`;
  const createOrgString = 'INSERT INTO organizations (org_name, password) VALUES($1, $2)';
  const createUserString =
    'INSERT INTO users (username, email, password, org_name, org_id) VALUES($1, $2, $3, $4, (SELECT id FROM organizations WHERE org_name = $5))';
  const createOrgVaultTableString = `CREATE TABLE ${org_name} (id SERIAL PRIMARY KEY NOT NULL, item VARCHAR(255) UNIQUE, category VARCHAR(255), vault JSONB)`;
  checkOrg(org, orgPass).then((result) => {
    // case 1
    if (result.status === 1) {
      return { success: false, status: 1, info: 'Invalid organization password!' };
      // case 2
    } else if (result.status === 2) {
      return new Promise((resolve, reject) => {
        db.query(createUserString, [username, email, password, org_name, org])
          .then(() => {
            return resolve({ success: true, status: 0 });
          })
          .catch((err) => {
            return reject({ success: false, status: 2 });
          });
      });
    } else {
      // case 3
      return new Promise((resolve, reject) => {
        db.query(createOrgVaultTableString).then(() => {
          db.query(createOrgString, [org, bcrypt.hashSync(orgPass, 10)])
            .then(() => {
              db.query(createUserString, [username, email, password, org_name, org])
                .then(() => {
                  return resolve({ success: true });
                })
                .catch((err) => {
                  return reject({ success: false });
                });
            })
            .catch((err) => {
              return reject({ success: false });
            });
        });
      });
    }
  });
};

const userLogin = (username, password) => {
  const queryString = 'SELECT * FROM users WHERE username = $1';
  return new Promise((resolve, reject) => {
    db.query(queryString, [username]).then((result) => {
      if (result.rows.length === 0 || (result.rows.length > 0 && !bcrypt.compareSync(password, result.rows[0].password))) {
        return reject({ user_id: null, success: false, info: 'Invalid Username or Password!' });
      } else {
        const getUserInfoString =
          'SELECT users.*, organizations.* FROM users JOIN organizations ON org_id = organizations.id WHERE users.username = $1 GROUP BY users.id, organizations.id';
        db.query(getUserInfoString, [username])
          .then((data) => {
            let result = {
              user_id: data.rows[0].id,
              username: data.rows[0].username,
              success: true,
              info: 'Login Success',
              org_name: data.rows[0].org_name,
              org_id: data.rows[0].org_id,
            };
            db.query(`SELECT * FROM ${result.org_name}`)
              .then((data) => {
                result.vault = data.rows[0];
                return resolve(result);
              })
              .catch((err) => {
                return reject(err);
              });
          })
          .catch((err) => {
            return reject(err);
          });
      }
    });
  }).catch((err) => {
    console.log('userLoginError', err);
  });
};
const resetPassword = (username, newPassword) => {
  const queryString = 'UPDATE users SET password = $1 WHERE username = $2';
  return new Promise((resolve, reject) => {
    db.query(queryString, [bcrypt.hashSync(newPassword, 10), username])
      .then((data) => {
        if (data.rowCount > 0) {
          return resolve({ success: true });
        }
      })
      .catch((err) => {
        return reject({ success: false, err: err });
      });
  });
};
module.exports = { checkUsername, checkOrg, userRegister, userLogin, resetPassword };
