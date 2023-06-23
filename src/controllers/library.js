/* eslint-disable no-console */
const { Library, Book } = require('../models');

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
      res.json((404), { action: 'Get library', error: 'Library not found' });
    } else {
      res.json(library);
    }
  } catch (err) {
    res.json((500), { action: 'Get library', error: err.message });
  }
};

const getAllLibraries = async (req, res) => {
  try {
    const allLibraries = await Library.findAll({ include: { model: Book } });
    if (!allLibraries) {
      res.status((404), { action: 'Get all libraries', error: 'Libraries not found' });
    } else {
      res.json(allLibraries);
    }
  } catch (err) {
    res.json((500), { action: 'Get all libraries', error: err.message });
  }
};

const updateLibrary = async (req, res) => {
  try {
    const update = await Library.update({
      name: req.body.name,
      location: req.body.location,
      telephone: req.body.telephone,
    }, {
      where: {
        id: req.params.libraryId,
      },
    });
    if (update[0] > 0) {
      const libraryUpdated = await Library.findByPk(req.params.libraryId);
      res.json(libraryUpdated);
    } else {
      res.json(400, { action: 'Update library', error: 'Library not found' });
    }
  } catch (err) {
    res.json((500), { action: 'Update library', error: err.message });
  }
};

const deleteLibrary = async (req, res) => {
  try {
    const deleted = await Library.update({
      active: req.body.active,
    }, {
      where: {
        id: req.params.libraryId,
      },
    });
    if (deleted[0] > 0) {
      const libraryDeleted = await Library.findByPk(req.params.libraryId);
      res.json(libraryDeleted);
    } else {
      res.json(400, { action: 'Delete library', error: 'Library not deleted' });
    }
  } catch (err) {
    res.json((500), { action: 'Delete library', error: err.message });
  }
};

// const addNewBook

module.exports = {
  createLibrary, getLibrary, getAllLibraries, updateLibrary, deleteLibrary,
};
