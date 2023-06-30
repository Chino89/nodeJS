const { bookService } = require('../services');

const createBook = async (req, res) => {
  try {
    const newBook = await bookService.createBook(req.body);
    res.json((201), newBook);
  } catch (err) {
    res.json(err.code ?? 500, { action: 'Create book', error: err.message });
  }
};

const getBook = async (req, res) => {
  try {
    const book = await bookService.getBook(req.params.bookId);
    res.json((200), book);
  } catch (err) {
    res.json(err.code ?? 500, { action: 'Get book', error: err.message });
  }
};

const getAllBooks = async (req, res) => {
  try {
    const allBooks = await bookService.getAllBooks();
    res.json((200), allBooks);
  } catch (err) {
    res.json(err.code ?? 500, { action: 'Get all books', error: err.message });
  }
};

const updateBook = async (req, res) => {
  try {
    const update = await bookService.updateBook(req.body, req.params.bookId);
    res.json((200), update);
  } catch (err) {
    res.json(err.code ?? 500, { action: 'Update book', error: err.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    const inactiveBook = await bookService.deleteBook(req.params.bookId);
    res.json((200), inactiveBook);
  } catch (err) {
    res.json(err.code ?? 500, { action: 'Delete book', error: err.message });
  }
};

module.exports = {
  createBook, getBook, getAllBooks, updateBook, deleteBook,
};
