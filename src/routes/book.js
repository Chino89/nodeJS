const express = require('express');

const router = express.Router();
const { userIsAdminMDW } = require('../middleware/auth');
const { bookController } = require('../controllers');

router.post('/', userIsAdminMDW, bookController.createBook); // (AUTH)
router.get('/all', bookController.getAllBooks);
router.get('/:bookId', bookController.getBook);
router.post('/:bookId', userIsAdminMDW, bookController.updateBook); // (AUTH)
router.delete('/:bookId', userIsAdminMDW, bookController.deleteBook); // (AUTH)

module.exports = router;
