/* eslint-disable no-return-await */
const { bookProvider } = require('../providers');

const createBook = async (book) => await bookProvider.createBook(book);

const getBook = async (id) => await bookProvider.getBook(id);

const getAllBooks = async () => await bookProvider.getAllBooks();

const updateBook = async (book, id) => await bookProvider.updateBook(book, id);

const deleteBook = async (id) => await bookProvider.deleteBook(id);

module.exports = {
  createBook, getBook, getAllBooks, updateBook, deleteBook,
};
