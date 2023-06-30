/* eslint-disable no-console */
const { Book } = require('../models');

const createBook = async (book) => {
  try {
    const newBook = await Book.create(book);
    return newBook;
  } catch (err) {
    const error = new Error('Unauthorized to create');
    error.code = 401;
    throw error;
  }
};

const getBook = async (id) => {
  try {
    const book = await Book.findByPk(id);
    if (!book) {
      const error = new Error('Book not found');
      error.code = 404;
      throw error;
    } else {
      return book;
    }
  } catch (err) {
    console.error({ action: 'Get book', error: err.message });
    throw err;
  }
};

const getAllBooks = async () => {
  try {
    const allBooks = await Book.findAll({
      where: {
        active: true,
      },
    });
    if (!allBooks) {
      const error = new Error('Books not found');
      error.code = 404;
      throw error;
    } else {
      return allBooks;
    }
  } catch (err) {
    console.error({ action: 'Get all books', error: err.message });
    throw err;
  }
};

const updateBook = async (book, id) => {
  try {
    const update = await Book.update({
      isbn: book.isbn,
      title: book.title,
      author: book.author,
      year: book.year,
      LibraryId: book.LibraryId,
      active: book.active,
    }, {
      where: {
        id,
      },
    });
    if (update[0] > 0) {
      const bookUpdated = await Book.findByPk(id);
      return bookUpdated;
    }
    const error = new Error('Book not found');
    error.code = 404;
    throw error;
  } catch (err) {
    console.error({ action: 'Update book', error: err.message });
    throw err;
  }
};

const deleteBook = async (id) => {
  try {
    const deleted = await Book.update({
      active: false,
    }, {
      where: {
        id,
      },
    });
    if (deleted[0] > 0) {
      const bookDeleted = await Book.findByPk(id);
      return bookDeleted;
    }
    const error = new Error('Book not found');
    error.code = 404;
    throw error;
  } catch (err) {
    console.error({ action: 'Delete book', error: err.message });
    throw err;
  }
};

module.exports = {
  createBook, getBook, getAllBooks, updateBook, deleteBook,
};
