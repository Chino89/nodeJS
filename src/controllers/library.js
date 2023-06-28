/* eslint-disable no-console */
const { Library, Book } = require('../models');

const createLibrary = async (req, res) => {
  try {
    const newLibrary = await Library.create(req.body);
    res.json(newLibrary);
  } catch (err) {
    res.json((500), { action: 'Create Library', error: 'Los campos son requeridos' });
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
    const allLibraries = await Library.findAll({
      where: {
        active: true,
      },
      include: {
        model: Book,
        where: { active: true },
        required: false,
      },
    });
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
      active: req.body.active,
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
      active: false,
    }, {
      where: {
        id: req.params.libraryId,
      },
    });
    if (deleted[0] > 0) {
      const library = await Library.findByPk(req.params.libraryId);
      await library.setBooks([]);
      res.json(library);
    } else {
      res.json(400, { action: 'Delete library', error: 'Library not deleted' });
    }
  } catch (err) {
    res.json((500), { action: 'Delete library', error: err.message });
  }
};

module.exports = {
  createLibrary, getLibrary, getAllLibraries, updateLibrary, deleteLibrary,
};
