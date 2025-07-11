
const express = require('express');
const router = express.Router();
const librariesController = require('../controllers/librariesController');

// Libraries routes
router.get('/', librariesController.getAllLibraries);
router.get('/:id', librariesController.getLibraryById);
router.post('/', librariesController.createLibrary);
router.put('/:id', librariesController.updateLibrary);
router.delete('/:id', librariesController.deleteLibrary);

module.exports = router;
