const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
<<<<<<< HEAD
const config = require('./config.json');
=======
>>>>>>> origin/main
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5300;
const uri = process.env.MONGODB_URI;
<<<<<<< HEAD
const mongoUri = config.mongoUri;
=======
>>>>>>> origin/main

// Middleware setup
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
<<<<<<< HEAD
  .connect(mongoUri, { useNewUrlParser: true })
=======
  .connect(uri, { useNewUrlParser: true })
>>>>>>> origin/main
  .then(() => console.log("MongoDB database connection established successfully"))
  .catch((error) => console.error("MongoDB connection error:", error));

const connection = mongoose.connection;

// Event listener for MongoDB connection errors
connection.on('error', (error) => {
  console.error("MongoDB connection error:", error);
});

// Routes
const exercisesRouter = require('./routes/exercises');
<<<<<<< HEAD
app.use('/exercises', exercisesRouter);
=======
const usersRouter = require('./routes/users');
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);
>>>>>>> origin/main

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

module.exports = app;  