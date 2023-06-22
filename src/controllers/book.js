const { bookService } = require('../services')

const createBook = (req, res) => {
    try {
        const newBook = bookService.createBook(req.params.bookId, req.body);
        res.status(200).json(newBook);
    } catch (error) {
        res.status(400);
        res.json({ action: "create book", error: error.message })
    }
};

const getBook = (req, res) => {
    res.json({ "message": "Estoy funcionando" })
}

module.exports = { createBook, getBook }