import os

MONGO_DB = os.environ.get('MONGO_DB', 'activity')
MONGO_URI = os.environ.get('MONGO_URI', 'mongodb://root:cfgmla23@localhost:27017')