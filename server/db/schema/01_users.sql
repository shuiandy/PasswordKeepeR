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
UPDATE vaults
SET vault = jsonb_set (
    vault,
    '{"username": "", "password": "", "website": "", "category": "", "last_modified": "", "create_time": "" }'::jsonb
  )
WHERE id=1;
-- insert new data
UPDATE vaults SET vault = vault || '{"1": {"username": "shuiandy", "password": "1Shui5Andy"}}'::jsonb WHERE id = 2;
-- delete a record
UPDATE vaults SET vault = vault- '{"1"}'::text[] WHERE id = 2;

UPDATE vaults SET vault = vault || '{"1": {"username": "haha"}}'::jsonb WHERE id = 2;
UPDATE vaults SET vault = jsonb_set(vault, '{"1": {"username": "shuiandy", "password": "1Shui5Andy"}}'::jsonb) WHERE id = 2;
UPDATE organizations
SET vault = vault || '{"haha": {"username": "haha", "password": "haha", "website": "haha", "category": "haha" , "last_modified": 9999, "create_time": 9999}}'::jsonb
WHERE id = 1
INSERT INTO users (username, email, password, org_id) VALUES('haha223', 'haha', 'haha@haha.com', (SELECT id FROM organizations WHERE org_name = 'haha'));

SELECT users.*,
  organizations.org_name, organizations.vault
FROM users
  JOIN organizations ON org_id = organizations.id
WHERE users.username = 'haha'
GROUP BY users.id,
  organizations.id;

UPDATE organizations SET vault=vault #- '{"haha"}' WHERE id = 1;