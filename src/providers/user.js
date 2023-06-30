/* eslint-disable no-console */
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const { User, Admin } = require('../models');

const createUser = async (user) => {
  try {
    const userInDatabase = await User.findOne({
      where: {
        email: user.email,
      },
    });

    if (userInDatabase) {
      const error = new Error('Email already in use');
      error.code = 409;
      throw error;
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
      const error = new Error('User not found');
      error.code = 404;
      throw error;
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
      const error = new Error('Users not found');
      error.code = 404;
      throw error;
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
    if (user.email) {
      const userExist = await User.findOne({
        where: {
          email: user.email,
          id: { [Op.not]: id },
        },
      });

      if (userExist) {
        const error = new Error('Email already in use');
        error.code = 409;
        throw error;
      }
    }
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
    const error = new Error('User not found');
    error.code = 404;
    throw error;
  } catch (err) {
    console.error({ action: 'Update user', error: err.message });
    throw err;
  }
// try {
  //   const update = await User.update({
  //     firstName: user.firstName,
  //     lastName: user.lastName,
  //     email: user.email,
  //     active: user.active,
  //   }, {
  //     where: {
  //       id,
  //     },
  //   });
  //   if (update[0] > 0) {
  //     const userUpdated = await User.findByPk(id);
  //     return userUpdated;
  //   }
  //   const error = new Error('User not found');
  //   error.code = 404;
  //   throw error;
  // } catch (err) {
  //   console.error({ action: 'Update user', error: err.message });
  //   throw err;
  // }
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
