const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
<<<<<<< HEAD
=======
const promClient = require('prom-client');
require('dotenv').config(); 
>>>>>>> s15-monitoring

const config = require('./config.json');

const app = express();
const port = process.env.PORT || 5300;
<<<<<<< HEAD
const baseUri = process.env.MONGO_URI || config.mongoUri;
const database = process.env.MONGO_DB || config.mongoDb;
const mongoUri = `${baseUri}/${database}`;
=======
const mongoUri = process.env.MONGODB_URI || config.mongoUri; // Fallback to config if env var is not set
>>>>>>> s15-monitoring

app.use(cors());
app.use(express.json());

mongoose
  .connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB database connection established successfully"))
  .catch((error) => console.error("MongoDB connection error:", error));

const connection = mongoose.connection;

connection.on('error', (error) => {
  console.error("MongoDB connection error:", error);
});

<<<<<<< HEAD
=======
// Create a Registry to register the metrics
const register = new promClient.Registry();

// Enable the collection of default metrics
promClient.collectDefaultMetrics({ register });

// Add a route for the metrics endpoint
app.get('/metrics', async (req, res) => {
  try {
    // Retrieve metrics from the registry
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
  } catch (err) {
    res.status(500).end(err);
  }
});

>>>>>>> s15-monitoring
const exercisesRouter = require('./routes/exercises');
app.use('/exercises', exercisesRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

module.exports = app;
