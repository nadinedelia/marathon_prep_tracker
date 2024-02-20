from flask_cors import CORS
from flask_pymongo import PyMongo
from prometheus_flask_exporter import PrometheusMetrics

mongo = PyMongo()
metrics = None  

def configure_extensions(app):
    CORS(app, resources={r"/*": {"origins": "*"}}, methods="GET,HEAD,POST,OPTIONS,PUT,PATCH,DELETE")
    mongo.init_app(app)
    
    global metrics
    metrics = PrometheusMetrics(app)  
