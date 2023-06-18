const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

// Create a new user
router.post('/', UserController.createUser);

// Retrieve a user by ID
router.get('/:id', UserController.getUserById);

// Update a user
router.put('/:id', UserController.updateUser);

// Delete a user
router.delete('/:id', UserController.deleteUser);

module.exports = router;
