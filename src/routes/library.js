const express = require('express');
const { libraryController } = require('../controllers');

const router = express.Router();

router.post('/', libraryController.createLibrary);
router.get('/all', libraryController.getAllLibraries);
router.get('/:libraryId', libraryController.getLibrary);
router.post('/:libraryId', libraryController.updateLibrary);
router.delete('/:libraryId', libraryController.deleteLibrary);

module.exports = router;
