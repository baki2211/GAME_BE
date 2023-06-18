const { Sequelize } = require('sequelize');
require('dotenv').config();


// Create a new Sequelize instance
const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    // Additional Sequelize options can be added here
  }
);

// Export the Sequelize instance
module.exports = sequelize;
