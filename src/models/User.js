const { DataTypes } = require('sequelize');
const { sequelize } = require('../database');
const bcrypt = require('bcrypt');
const Character = require('./Character');

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
  },
});

User.hasMany(Character, { foreignKey: 'userId' });

User.createUser = async function (username, email, password) {
  const permissions = 'user';

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await User.create({
      username,
      email,
      password: hashedPassword,
      permissions,
    });

    return createdUser;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

User.findByUsername = async function (username) {
  try {
    const user = await User.findOne({
      where: {
        username,
      },
    });

    return user;
  } catch (error) {
    console.error('Error finding user by username: ', error);
    throw error;
  }
};

User.findUserByEmail = async function (email) {
  try {
    const user = await User.findOne({
      where: {
        email,
      },
    });

    return user;
  } catch (error) {
    console.error('Error finding user by email: ', error);
    throw error;
  }
};

User.prototype.updateUserPermissions = async function (permissions) {
  try {
    this.permissions = permissions;
    await this.save();
  } catch (error) {
    console.error('Error updating user permissions: ', error);
    throw error;
  }
};

User.prototype.updateEmailAndPassword = async function (email, password) {
  try {
    this.email = email;
    this.password = await bcrypt.hash(password, 10);
    await this.save();
  } catch (error) {
    console.error('Error updating user email and password: ', error);
    throw error;
  }
};

User.prototype.createCharacter = async function (name, surname, race, corporation) {
  try {
    const character = await Character.create({
      name,
      surname,
      race,
      corporation,
      userId: this.id,
    });

    return character;
  } catch (error) {
    console.error('Error creating character:', error);
    throw error;
  }
};

User.prototype.findCharacters = async function () {
  try {
    const characters = await Character.findAll({
      where: {
        userId: this.id,
      },
    });

    return characters;
  } catch (error) {
    console.error('Error finding characters:', error);
    throw error;
  }
};

User.prototype.deleteCharacter = async function (characterId) {
  try {
    const character = await Character.findOne({
      where: {
        id: characterId,
        userId: this.id,
      },
    });

    if (!character) {
      throw new Error('Character not found');
    }

    await character.destroy();
    return true;
  } catch (error) {
    console.error('Error deleting character:', error);
    throw error;
  }
};

module.exports = User;
