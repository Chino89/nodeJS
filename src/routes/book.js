const express = require('express');

const router = express.Router();
const { jwtValidMDW } = require('../middleware/auth');
const { bookController } = require('../controllers');

router.post('/', jwtValidMDW, bookController.createBook); // (AUTH)
router.get('/all', bookController.getAllBooks);
router.get('/:bookId', bookController.getBook);
router.post('/:bookId', bookController.updateBook); // (AUTH)
router.delete('/:bookId', bookController.deleteBook); // (AUTH)

module.exports = router;
