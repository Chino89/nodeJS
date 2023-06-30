/* eslint-disable no-return-await */
const { userProvider } = require('../providers');

const createUser = async (user) => await userProvider.createUser(user);

const createAdmin = async () => await userProvider.createAdmin();

const getUser = async (id) => await userProvider.getUser(id);

const getAllUsers = async () => await userProvider.getAllUsers();

const updateUser = async (user, id) => await userProvider.updateUser(user, id);

const deleteUser = async (id) => await userProvider.deleteUser(id);

module.exports = {
  createUser, createAdmin, getUser, getAllUsers, updateUser, deleteUser,
};
