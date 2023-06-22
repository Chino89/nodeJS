const { Library } = require('../models');

const createLibrary = async (req, res) => {
  try {
    const newLibrary = await Library.create(req.body);
    res.json(newLibrary);
  } catch (err) {
    res.json((500), { action: 'Create Library', error: err.message });
  }
};

const getLibrary = async (req, res) => {
  try {
    const library = await Library.findByPk(req.params.libraryId);
    if (!library) {
      res.status(404).json({ action: 'Get library', error: 'Library not found' });
    } else {
      res.json(library);
    }
  } catch (err) {
    res.json((500), { action: 'Get library', error: err.message });
  }
};

// const getAllLibraries

// const modifyLibrary

// const deleteLibrary

// const addNewBook

module.exports = { createLibrary, getLibrary };
