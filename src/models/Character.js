const { DataTypes } = require('sequelize');
const { sequelize } = require('../database');

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
    defaultValue: 0,
  },
  skillPoints: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  learnedSkills: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: [],
  },
  lastUsedChat: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '',
  },
  actionLog: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: [],
  },
});

module.exports = Character;
