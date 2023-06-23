/* eslint-disable no-console */
const { Book } = require('../models');

const createBook = async (req, res) => {
  try {
    const newBook = await Book.create(req.body);
    res.json(newBook);
  } catch (err) {
    res.json((500), { action: 'Create Book', error: err.message });
  }
};

const getBook = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.bookId);
    if (!book) {
      res.json((404), { action: 'Get book', error: 'Book not found' });
    } else {
      res.json(book);
    }
  } catch (err) {
    res.json((500), { action: 'Get book', error: err.message });
  }
};

const getAllBooks = async (req, res) => {
  try {
    const allBooks = await Book.findAll();
    if (!allBooks) {
      res.status((404), { action: 'Get all books', error: 'Books not found' });
    } else {
      res.json(allBooks);
    }
  } catch (err) {
    res.json((500), { action: 'Get all books', error: err.message });
  }
};

const updateBook = async (req, res) => {
  try {
    const update = await Book.update({
      isbn: req.body.isbn,
      title: req.body.title,
      author: req.body.author,
      year: req.body.year,
      library: req.body.library,
      active: req.body.active,
    }, {
      where: {
        id: req.params.bookId,
      },
    });
    if (update[0] > 0) {
      const bookUpdated = await Book.findByPk(req.params.bookId);
      res.json(bookUpdated);
    } else {
      res.json(400, { action: 'Update book', error: 'Book not found' });
    }
  } catch (err) {
    res.json((500), { action: 'Update book', error: err.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    const deleted = await Book.update({
      active: req.body.active,
    }, {
      where: {
        id: req.params.bookId,
      },
    });
    if (deleted[0] > 0) {
      const bookDeleted = await Book.findByPk(req.params.bookId);
      res.json(bookDeleted);
    } else {
      res.json(400, { action: 'Delete book', error: 'Book not deleted' });
    }
  } catch (err) {
    res.json((500), { action: 'Delete book', error: err.message });
  }
};

module.exports = {
  createBook, getBook, getAllBooks, updateBook, deleteBook,
};
