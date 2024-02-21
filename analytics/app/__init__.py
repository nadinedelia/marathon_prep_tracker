from flask import Flask
from .extensions import configure_extensions
from .routes import register_blueprints
from pymongo import MongoClient
import os
from dotenv import load_dotenv


load_dotenv()

def create_app(config_object='app.settings'):
    app = Flask(__name__)
    app.config.from_object(config_object)

    mongo_uri = os.getenv('MONGO_URI')
    mongo_db_name = os.getenv('MONGO_DB')
    client = MongoClient(mongo_uri)
    db = client[mongo_db_name]

    app.config["mongo_db"] = db

    configure_extensions(app)
    register_blueprints(app)

    return app
