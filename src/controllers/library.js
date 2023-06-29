/* eslint-disable no-console */
const { libraryService } = require('../services');

const createLibrary = async (req, res) => {
  try {
    const newLibrary = await libraryService.createLibrary(req.body);
    res.json((200), newLibrary);
  } catch (err) {
    res.json((500), { action: 'Create Library', error: err.message });
  }
};

const getLibrary = async (req, res) => {
  try {
    const library = await libraryService.getLibrary(req.params.libraryId);
    res.json((200), library);
  } catch (err) {
    res.json((500), { action: 'Get library', error: err.message });
  }
};

const getAllLibraries = async (req, res) => {
  try {
    const allLibraries = await libraryService.getAllLibraries();
    res.json((200), allLibraries);
  } catch (err) {
    res.json((500), { action: 'Get all libraries', error: err.message });
  }
};

const updateLibrary = async (req, res) => {
  try {
    const update = await libraryService.updateLibrary(req.body, req.params.libraryId);
    res.json((200), update);
  } catch (err) {
    res.json(err.code ?? 500, { action: 'Update library', error: err.message ?? 'Can not update library' });
  }
};

const deleteLibrary = async (req, res) => {
  try {
    const libraryInactive = await libraryService.deleteLibrary(req.params.libraryId);
    res.json((200), libraryInactive);
  } catch (err) {
    res.json(err.code ?? 500, { action: 'Delete library', error: err.message });
  }
};

module.exports = {
  createLibrary, getLibrary, getAllLibraries, updateLibrary, deleteLibrary,
};
