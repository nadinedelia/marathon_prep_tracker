from dotenv import load_dotenv
from flask import Flask, render_template, jsonify, request, redirect, url_for
from pymongo import MongoClient
from flask_pymongo import PyMongo
from urllib.parse import quote_plus
from bson import json_util
import json
import os

app = Flask(__name__)

load_dotenv()
title = "TODO"
heading = "Flask Microservice"

client = MongoClient(os.getenv('MONGODB_URI'))
db = client.test


@app.route('/')
def index():
    exercises = db.exercises.find()
    exercises_list = list(exercises)

    return json_util.dumps(exercises_list)


@app.route('/stats')
def stats():
    user = "testuser"
    # user = get_jwt_identity()

    pipeline = [
        {"$match": {"username": user}},
        {"$group": {
            "_id": "$exerciseType",
            "duration": {"$sum": "$duration"}
        }}
    ]

    stats = list(db.exercises.aggregate(pipeline))
    stats_json = json.dumps(json_util.loads(json_util.dumps(stats)), indent=4)
    return stats_json


@app.route("/list")
def lists():
    exercises = db.exercises.find()
    return render_template('index.html', activities=exercises, t=title, h=heading)


if __name__ == "__main__":
    app.run(debug=True)
