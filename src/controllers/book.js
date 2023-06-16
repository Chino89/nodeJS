const fs = require('fs')
const bookFile = 'book.json';


const createBook = (req, res) => {
    console.log(`Book Id ${req.params.bookId} created`)
    res.json({ id: req.params.bookId, ...req.body });
}


module.exports = { createBook }