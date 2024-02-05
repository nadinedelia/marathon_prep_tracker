const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const config = require('./config.json');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5300;
const baseUri = process.env.MONGO_URI || config.mongoUri;
const database = process.env.MONGO_DB || config.mongoDb;
const mongoUri = `${baseUri}/${database}`;

app.use(cors());
app.use(express.json());

mongoose
  .connect(mongoUri, { useNewUrlParser: true })
  .then(() => console.log("MongoDB database connection established successfully"))
  .catch((error) => console.error("MongoDB connection error:", error));

const connection = mongoose.connection;

connection.on('error', (error) => {
  console.error("MongoDB connection error:", error);
});

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