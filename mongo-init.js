db = db.getSiblingDB('authservice');
db.createUser({
  user: 'root',
  pwd: 'cfgmla23',
  roles: [
    { role: 'readWrite', db: 'authservice' },
    { role: 'dbAdmin', db: 'authservice' }
  ]
});

db = db.getSiblingDB('activity');
db.createUser({
  user: 'root',
  pwd: 'cfgmla23',
  roles: [
    { role: 'readWrite', db: 'activity' },
    { role: 'dbAdmin', db: 'activity' }
  ]
});
