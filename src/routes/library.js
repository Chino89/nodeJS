const express = require('express');
const { libraryController } = require('../controllers');

const router = express.Router();

router.post('/', libraryController.createLibrary); // (AUTH)
router.get('/all', libraryController.getAllLibraries);
router.get('/:libraryId', libraryController.getLibrary);
router.post('/:libraryId', libraryController.updateLibrary); // (AUTH)
router.delete('/:libraryId', libraryController.deleteLibrary); // (AUTH)

module.exports = router;
