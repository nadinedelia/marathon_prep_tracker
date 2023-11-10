db = db.getSiblingDB('authservice_db');
db.createUser({
  user: 'root',
  pwd: 'cfgmla23',
  roles: [
    { role: 'readWrite', db: 'authservice_db' },
    { role: 'dbAdmin', db: 'authservice_db' }
  ]
});

db = db.getSiblingDB('activity_tracking_db');
db.createUser({
  user: 'root',
  pwd: 'cfgmla23',
  roles: [
    { role: 'readWrite', db: 'activity_tracking_db' },
    { role: 'dbAdmin', db: 'activity_tracking_db' }
  ]
});
