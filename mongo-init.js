db = db.getSiblingDB('auth');
db.createUser({
  user: 'root',
  pwd: 'cfgmla23',
  roles: [
    { role: 'readWrite', db: 'auth' },
    { role: 'dbAdmin', db: 'auth' }
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
