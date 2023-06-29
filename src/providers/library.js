/* eslint-disable no-console */
const { Library, Book } = require('../models');

const createLibrary = async (library) => {
  try {
    const newLibrary = await Library.create(library);
    return newLibrary;
  } catch (err) {
    console.error({ action: 'Create Library', error: err.message });
    throw err;
  }
};

const getLibrary = async (id) => {
  try {
    const library = await Library.findByPk(id);
    if (!library) {
      throw new Error('Library not found');
    } else {
      return library;
    }
  } catch (err) {
    console.error({ action: 'Get library', error: err.message });
    throw err;
  }
};

const getAllLibraries = async () => {
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
      throw new Error('Libraries not found');
    } else {
      return allLibraries;
    }
  } catch (err) {
    console.error({ action: 'Get all libraries', error: err.message });
    throw err;
  }
};

const updateLibrary = async (library, id) => {
  try {
    const update = await Library.update({
      name: library.name,
      location: library.location,
      telephone: library.telephone,
      active: library.active,
    }, {
      where: {
        id,
      },
    });
    if (update[0] > 0) {
      const libraryUpdated = await Library.findByPk(id);
      return libraryUpdated;
    }
    const error = new Error('Library not found');
    error.code = 404;
    throw error;
  } catch (err) {
    console.error({ action: 'Update library', error: err.message });
    throw err;
  }
};

const deleteLibrary = async (id) => {
  try {
    const deleted = await Library.update({
      active: false,
    }, {
      where: {
        id,
      },
    });
    if (deleted[0] > 0) {
      const library = await Library.findByPk(id);
      await library.setBooks([]);
      return library;
    }
    const error = new Error('Library not found');
    error.code = 404;
    throw error;
  } catch (err) {
    console.error({ action: 'Delete library', error: err.message });
    throw err;
  }
};

module.exports = {
  createLibrary, getLibrary, getAllLibraries, updateLibrary, deleteLibrary,
};
