from flask import Flask
from .main import main_bp
from .stats import stats_bp

def register_blueprints(app: Flask):
    app.register_blueprint(main_bp)
    app.register_blueprint(stats_bp)
