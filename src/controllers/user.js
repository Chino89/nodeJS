// eslint-disable-next-line import/no-extraneous-dependencies
const { userService } = require('../services');

const createUser = async (req, res) => {
  try {
    const newUser = await userService.createUser(req.body);
    res.json((200), newUser);
  } catch (err) {
    res.json(err.code ?? 500, { action: 'Create user', error: err.message });
  }
};

const createAdmin = async (req, res) => {
  try {
    const newUser = await userService.createAdmin(req.body);
    res.json((200), `Wellcome, ${newUser.user}`);
  } catch (err) {
    res.json((500), { action: 'Create admin', error: err.message });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await userService.getUser(req.params.userId);
    res.json((200), user);
  } catch (err) {
    res.json(err.code ?? 500, { action: 'Get user', error: err.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await userService.getAllUsers();
    res.json((200), allUsers);
  } catch (err) {
    res.json((500), { action: 'Get all users', error: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const update = await userService.updateUser(req.body, req.params.userId);
    res.json((200), update);
  } catch (err) {
    res.json(err.code ?? 500, { action: 'Update user', error: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userInactive = await userService.deleteUser(req.params.userId);
    res.json((200), userInactive);
  } catch (err) {
    res.json((500), { action: 'Delete user', error: err.message });
  }
};

module.exports = {
  createUser, getUser, getAllUsers, updateUser, deleteUser, createAdmin,
};
