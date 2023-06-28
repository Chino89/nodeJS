const express = require('express');
const { userIsAdminMDW } = require('../middleware/auth');
const { libraryController } = require('../controllers');

const router = express.Router();

router.post('/', userIsAdminMDW, libraryController.createLibrary); // (AUTH)
router.get('/all', libraryController.getAllLibraries);
router.get('/:libraryId', libraryController.getLibrary);
router.post('/:libraryId', userIsAdminMDW, libraryController.updateLibrary); // (AUTH)
router.delete('/:libraryId', userIsAdminMDW, libraryController.deleteLibrary); // (AUTH)

module.exports = router;
