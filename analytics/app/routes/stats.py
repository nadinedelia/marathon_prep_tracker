from flask import Blueprint, jsonify, request, current_app
from bson import json_util
from datetime import datetime, timedelta
import logging
import traceback

stats_bp = Blueprint('stats', __name__, url_prefix='/stats')


def get_db():
    return current_app.config["mongo_db"]

@stats_bp.route('/')
def stats():
    db = get_db()
    pipeline = [
        {
            "$group": {
                "_id": {
                    "username": "$username",
                    "exerciseType": "$exerciseType"
                },
                "totalDuration": {"$sum": "$duration"},
                "totalDistance": {"$sum": "$distance"}
            }
        },
        {
            "$group": {
                "_id": "$_id.username",
                "exercises": {
                    "$push": {
                        "exerciseType": "$_id.exerciseType",
                        "totalDuration": "$totalDuration",
                        "totalDistance": "$totalDistance"
                    }
                }
            }
        },
        {
            "$project": {
                "username": "$_id",
                "exercises": 1,
                "_id": 0
            }
        }
    ]
    stats = list(db.exercises.aggregate(pipeline))
    return jsonify(stats=stats)

@stats_bp.route('/<username>', methods=['GET'])
def user_stats(username):
    db = get_db()
    pipeline = [
        {
            "$match": {"username": username}
        },
        {
            "$group": {
                "_id": {
                    "username": "$username",
                    "exerciseType": "$exerciseType"
                },
                "totalDuration": {"$sum": "$duration"},
                "totalDistance": {"$sum": "$distance"}
            }
        },
        {
            "$group": {
                "_id": "$_id.username",
                "exercises": {
                    "$push": {
                        "exerciseType": "$_id.exerciseType",
                        "totalDuration": "$totalDuration",
                        "totalDistance": "$totalDistance"
                    }
                }
            }
        },
        {
            "$project": {
                "username": "$_id",
                "exercises": 1,
                "_id": 0
            }
        }
    ]
    stats = list(db.exercises.aggregate(pipeline))
    return jsonify(stats=stats)

@stats_bp.route('/weekly/', methods=['GET'])
def weekly_user_stats():
    db = get_db()
    username = request.args.get('user')
    start_date_str = request.args.get('start')
    end_date_str = request.args.get('end')

    date_format = "%Y-%m-%d"
    try:
        start_date = datetime.strptime(start_date_str, date_format)
        end_date = datetime.strptime(end_date_str, date_format) + timedelta(days=1)

        logging.info(f"Fetching weekly stats for user: {username} from {start_date} to {end_date}")
    except Exception as e:
        logging.error(f"Error parsing dates: {e}")
        return jsonify(error="Invalid date format"), 400

    pipeline = [
        {
            "$match": {
                "username": username,
                "date": {
                    "$gte": start_date,
                    "$lt": end_date
                }
            }
        },
        {
            "$project": {
                "date": 1,
                "exerciseType": 1,
                "duration": 1,
                "dayOfWeek": { "$dayOfWeek": "$date" },
                "formattedDate": { "$dateToString": { "format": "%Y-%m-%d", "date": "$date" } }
            }
        },
        {
            "$group": {
                "_id": {
                    "formattedDate": "$formattedDate",
                    "dayOfWeek": "$dayOfWeek",
                    "exerciseType": "$exerciseType"
                },
                "totalDuration": {"$sum": "$duration"}
            }
        },
        {
            "$group": {
                "_id": "$_id.formattedDate",
                "dayOfWeek": {"$first": "$_id.dayOfWeek"},
                "exercises": {
                    "$push": {
                        "exerciseType": "$_id.exerciseType",
                        "totalDuration": "$totalDuration"
                    }
                }
            }
        },
        {
            "$addFields": {
                "date": { "$toDate": "$_id" }
            }
        },
        {
            "$sort": { "date": 1 }
        },
        {
            "$project": {
                "_id": 0,
                "date": 1,
                "dayOfWeek": 1,
                "exercises": 1
            }
        }
    ]

    try:
        stats = list(db.exercises.aggregate(pipeline))
        return jsonify(stats=stats)
    except Exception as e:
        logging.error(f"An error occurred while querying MongoDB: {e}")
        traceback.print_exc()
        return jsonify(error="An internal error occurred"), 500
