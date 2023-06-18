const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();


// Create a Sequelize instance
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

// Define the User model
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  permissions: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'user',
  },
});

// Define the Character model
const Character = sequelize.define('Character', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  surname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  race: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  corporation: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  stats: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  equipment: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  expPoints: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  skillPoints: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  learnedSkills: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  lastUsedChat: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  actionLog: {
    type: DataTypes.JSON,
    allowNull: false,
  },
});

// Function to create tables
async function createTables() {
  try {
    // Sync the models with the database to create the tables
    await sequelize.sync();
    console.log('Tables created successfully');
  } catch (error) {
    console.error('Error creating tables:', error);
  } finally {
    // Close the database connection
    await sequelize.close();
  }
}

// Execute the table creation function
createTables();
