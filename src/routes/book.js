const express = require('express');

const router = express.Router();

const { bookController } = require('../controllers');

router.get('/', bookController.getBook);

module.exports = router;
