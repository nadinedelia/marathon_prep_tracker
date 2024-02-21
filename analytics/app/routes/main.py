from flask import current_app, Blueprint, jsonify

main_bp = Blueprint('main', __name__, url_prefix='/')

@main_bp.route('/')
def index():
    db = current_app.config["mongo_db"]
    exercises = db.exercises.find()
    exercises_list = [exercise for exercise in exercises]
    return jsonify(exercises_list)
