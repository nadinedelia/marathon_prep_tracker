const express = require('express');
const router = express.Router();
const User = require('../models/user.model');

// GET: Retrieve all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST: Add a new user
router.post('/add', async (req, res) => {
  try {
    const { username } = req.body;
    const newUser = new User({ username });
    await newUser.save();
    res.json({ message: 'User added successfully' });
  } catch (error) {
    res.status(422).json({ error: 'Invalid input' });
  }
});

module.exports = router;