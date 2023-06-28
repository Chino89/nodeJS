const express = require('express');

const router = express.Router();

const { userController } = require('../controllers');

router.post('/', userController.createAdmin);
router.get('/all', userController.getAllUsers);
router.get('/:userId', userController.getUser);
router.post('/:userId', userController.updateUser);
router.delete('/:userId', userController.deleteUser);

module.exports = router;
