from flask import Flask, jsonify
from pymongo import MongoClient
from bson import json_util

app = Flask(__name__)

# Your existing MongoDB connection code
mongo_uri = "mongodb+srv://test:test23@cfg-test.rvdyiux.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(mongo_uri)
db = client.test


@app.route('/')
def index():
    exercises = db.exercises.find()
    exercises_list = list(exercises)

    # Use json_util.dumps to convert ObjectId to string
    return json_util.dumps(exercises_list)


if __name__ == "__main__":
    app.run(debug=True)
