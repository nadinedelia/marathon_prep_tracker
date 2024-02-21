from flask_cors import CORS
from prometheus_flask_exporter import PrometheusMetrics

metrics = None

def configure_extensions(app):
    CORS(app, resources={r"/*": {"origins": "*"}}, methods="GET,HEAD,POST,OPTIONS,PUT,PATCH,DELETE")
    
    global metrics
    metrics = PrometheusMetrics(app)
