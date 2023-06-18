const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');
const User = require('../models/User');
const { authenticateUser } = require('../middlewares/auth');

const router = express.Router();

// Signup route
router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the user with the same email already exists
    const existingUser = await User.findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = await User.createUser(username, email, hashedPassword);

    // Generate a JWT token
    const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: '1h' });

    res.status(201).json({ user, token });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare the provided password with the hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: '1h' });

    res.status(200).json({ user, token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Logout route
router.post('/logout', authenticateUser, (req, res) => {
  
localStorage.removeItem('token');
  res.status(200).json({ message: 'Logout successful' });
});

// Dashboard route
router.get('/dashboard', authenticateUser, (req, res) => {
  const { permissions } = req.user;
  let dashboardView;

  if (permissions === 'admin') {
    dashboardView = 'admin_dashboard'; // Render admin dashboard view
  } else if (permissions === 'master') {
    dashboardView = 'master_dashboard'; // Render master dashboard view
  } else {
    dashboardView = 'player_dashboard'; // Render player dashboard view
  }

  res.render(dashboardView);
});

module.exports = router;
