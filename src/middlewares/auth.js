const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { jwtSecret } = require('../config');
const { User } = require('../models');

// Middleware function to authenticate user
const authenticateUser = (req, res, next) => {
  // Get the token from the request headers
  const token = req.headers.authorization;

  // Check if the token is provided
  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, jwtSecret);
    // Attach the user ID to the request for further processing
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// Middleware function for checking user permissions
const checkPermissions = (requiredPermissions) => async (req, res, next) => {
  try {
    // Get the user ID from the request
    const userId = req.userId;

    // Retrieve the user from the database based on the user ID
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the user has the required permissions
    if (!requiredPermissions.includes(user.permissions)) {
      return res.status(403).json({ message: 'Insufficient permissions' });
    }

    // Attach the user object to the request for further processing
    req.user = user;
    next();
  } catch (error) {
    console.error('Error finding user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Middleware function for protecting routes
const protectRoute = (req, res, next) => {
  // Example: Check if the user is authenticated
  if (!req.isAuthenticated) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  next();
};

module.exports = {
  authenticateUser,
  checkPermissions,
  protectRoute,
};
