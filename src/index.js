const sequelize = require('./config');
const { Sequelize } = require('sequelize');

(async () => {
  try {
    // Test the database connection
    await sequelize.authenticate();
    console.log('Connected to the database');

    // Sync all defined models with the database
    await sequelize.sync();

    // Start your server or perform other operations
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
})();
