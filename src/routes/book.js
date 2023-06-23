const express = require('express');

const router = express.Router();

const { bookController } = require('../controllers');

router.post('/', bookController.createBook);
router.get('/all', bookController.getAllBooks);
router.get('/:bookId', bookController.getBook);
router.post('/:bookId', bookController.updateBook);
router.delete('/:bookId', bookController.deleteBook);

module.exports = router;
