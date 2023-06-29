/* eslint-disable no-return-await */
const { libraryProvider } = require('../providers');

const createLibrary = async (library) => await libraryProvider.createLibrary(library);

const getLibrary = async (id) => await libraryProvider.getLibrary(id);

const getAllLibraries = async () => await libraryProvider.getAllLibraries();

const updateLibrary = async (library, id) => await libraryProvider.updateLibrary(library, id);

const deleteLibrary = async (id) => await libraryProvider.deleteLibrary(id);

module.exports = {
  createLibrary, getLibrary, getAllLibraries, updateLibrary, deleteLibrary,
};
