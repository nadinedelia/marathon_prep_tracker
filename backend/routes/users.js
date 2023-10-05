const express = require('express');
const router = express.Router();
const User = require('../models/user.model');

// Middleware to parse the request body
router.use(express.json());

router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

// Add a new user
router.post('/add', async (req, res) => {
  console.log(req.body);  // Log the request body

  try {
    const { username } = req.body;

    // Handle if username is not provided
    if (!username) {
      return res.status(400).json({ error: 'Username is required' });
    }

    const newUser = new User({ username });
    await newUser.save();
    res.json({ message: 'User added successfully' });
  } catch (error) {
    console.error(error);
    res.status(422).json({ error: error.message });
  }
});

module.exports = router;
