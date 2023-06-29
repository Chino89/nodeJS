const jwt = require('jsonwebtoken');
const { SERVER_SECRET } = require('../middleware/auth');
const { Admin } = require('../models');

const login = async (req, res) => {
  try {
    // Admin login
    const { user, pass } = req.body;
    const adminLogin = await Admin.findOne({ where: { user, pass } });

    if (adminLogin) {
      const token = jwt.sign({ ...adminLogin.toJSON(), role: 'Admin' }, SERVER_SECRET, {});
      res.json(200, { message: 'Wellcome Admin', token });
    } else {
      res.json(401, { action: 'Login', error: 'Unauthorized, Invalid credentials' });
    }
  } catch (err) {
    res.json(500, { error: 'Login error' });
  }
};

module.exports = { login };
