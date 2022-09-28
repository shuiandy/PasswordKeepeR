SELECT users.*,
  organizations.org_name,
  vaults.vault
FROM users
  JOIN organizations ON org_id = organizations.id
  JOIN vaults ON vault_id = vaults.id
WHERE users.username = 'haha'
GROUP BY users.id,
  organizations.id,
  vaults.id;
INSERT INTO organizations (org_name, password)
VALUES($1, $2)
;
SELECT users.*, organizations.org_name, (SELECT org_name FROM organizations WHERE org_id = users.org_id).* FROM users JOIN organizations ON org_id = organizations.id JOIN (
  SELECT org_name
  FROM organizations
  WHERE org_id = users.org_id
) WHERE users.username = 'test' GROUP BY users.id, organizations.id, (
  SELECT org_name
  FROM organizations
  WHERE org_id = user.org_id
).id;
elect users.*, organizations.org_name, organizations.org_name.* from users JOIN organizations ON org_id = organizations.id JOIN organizations.org_name ON organization WHERE users.username='test';org_i
SELECT username,
  email, test.*
FROM users
WHERE users.id = 1
  JOIN test
ORDER BY username;

INSERT INTO test (item, vault) VALUES('test', '{"username": "shuiandy", "password": "haha"}');