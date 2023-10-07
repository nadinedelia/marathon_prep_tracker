from flask import Flask, render_template
from flask_pymongo import PyMongo
from datetime import datetime, timedelta

app = Flask(__name__)

# Update the URI with your MongoDB connection URI
app.config["MONGO_URI"] = "mongodb://root:cfgmla23@localhost:27017/exercises"

mongo = PyMongo(app)


@app.route('/')
def index():
    one_week_ago = datetime.now() - timedelta(weeks=1)

    exercises = mongo.db.exercises.find({"date": {"$gte": one_week_ago}})

    weekly_stats = {
        "total_duration": sum(exercise['duration'] for exercise in exercises),
    }

    return render_template('index.html', weekly_stats=weekly_stats)


if __name__ == "__main__":
    app.run(debug=True)
