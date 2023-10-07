from flask import Flask, render_template, jsonify
from flask_pymongo import PyMongo
from urllib.parse import quote_plus

app = Flask(__name__)

username = quote_plus('root')
password = quote_plus('cfgmla23')

mongo_uri = f"mongodb://{username}:{password}@mongodb:27017/test"
app.config['MONGO_URI'] = mongo_uri

mongo = PyMongo(app)


@app.route('/')
def index():
    exercises = mongo.db.exercises.find()
    exercises_list = list(exercises)

    return jsonify(exercises_list)


if __name__ == "__main__":
    app.run(debug=True)
