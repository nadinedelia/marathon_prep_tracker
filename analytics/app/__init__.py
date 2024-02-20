from flask import Flask
from .extensions import configure_extensions
from .routes import register_blueprints

def create_app(config_object='app.settings'):
    app = Flask(__name__)
    app.config.from_object(config_object)

    configure_extensions(app)  
    register_blueprints(app)

    return app
