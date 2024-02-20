from flask import Blueprint, jsonify
from app.extensions import mongo

main_bp = Blueprint('main', __name__, url_prefix='/')

@main_bp.route('/')
def index():
    exercises = mongo.db.exercises.find()
    exercises_list = list(exercises)
    return jsonify(exercises_list)