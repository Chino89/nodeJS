/* eslint-disable no-console */
const bcrypt = require('bcrypt');
const { User, Admin } = require('../models');
const { usedEmail } = require('../Helpers/validator');

const createUser = async (user) => {
  try {
    const available = await usedEmail(user);
    if (!available) {
      return { action: 'Create user', message: 'That email is not available' };
    }
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = await User.create({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: hashedPassword,
    });
    return (`Welcome, ${newUser.firstName}`);
  } catch (err) {
    console.error('Error when creating User', err);
    throw err;
  }
};

const createAdmin = async () => {
  try {
    const admin = await Admin.findOne({ where: { user: 'admin' } });
    if (admin) {
      throw new Error('Admin already exist');
    } else {
      const newUser = await Admin.create({
        user: 'admin',
        pass: 'admin',
      });
      return (`Welcome, ${newUser.user}`);
    }
  } catch (err) {
    console.error({ action: 'Create admin', error: err.message });
    throw err;
  }
};

const getUser = async (id) => {
  try {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error('User not found');
    } else {
      return (user);
    }
  } catch (err) {
    console.error({ action: 'Get user', error: err.message });
    throw err;
  }
};

const getAllUsers = async () => {
  try {
    const allUsers = await User.findAll({
      where: {
        active: true,
      },
    });
    if (!allUsers) {
      throw new Error('Users not found');
    } else {
      return allUsers;
    }
  } catch (err) {
    console.error({ action: 'Get all user', error: err.message });
    throw err;
  }
};

const updateUser = async (user, id) => {
  try {
    const available = await usedEmail(user);
    if (!available) {
      const update = await User.update({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        active: user.active,
      }, {
        where: {
          id,
        },
      });
      if (update[0] > 0) {
        const userUpdated = await User.findByPk(id);
        return userUpdated;
      }
      throw new Error('User not found');
    } else {
      throw new Error('That email is not available');
    }
  } catch (err) {
    console.error({ action: 'Update user', error: err.message });
    throw err;
  }
};

const deleteUser = async (id) => {
  try {
    const deleted = await User.update({
      active: false,
    }, {
      where: {
        id,
      },
    });
    if (deleted[0] > 0) {
      const userDeleted = await User.findByPk(id);
      return userDeleted;
    }
    throw new Error('User not deleted');
  } catch (err) {
    console.error({ action: 'Delete user', error: err.message });
    throw err;
  }
};

module.exports = {
  createUser, createAdmin, getUser, getAllUsers, updateUser, deleteUser,
};
