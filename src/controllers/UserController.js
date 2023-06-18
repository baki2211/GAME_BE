const { User } = require('../models');

const UserController = {
  // Create a new user
  async createUser(req, res) {
    try {
      const { username, email, password } = req.body;
      const user = await User.create({ username, email, password });
      res.status(201).json(user);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Retrieve a user by ID
  async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error('Error retrieving user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Update a user
  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { username, email, password } = req.body;
      const user = await User.findByPk(id);
      if (user) {
        await user.update({ username, email, password });
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Delete a user
  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      if (user) {
        await user.destroy();
        res.status(200).json({ message: 'User deleted' });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
};

module.exports = UserController;
