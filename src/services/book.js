const fs = require('fs')

const createBook = (id, book) => {
    const bookFile = `book-${id}.json`;
    if (fs.existsSync(bookFile)) throw new Error("File Exists")
    fs.writeFileSync(bookFile, JSON.stringify(book));
    return book;
}

module.exports = { createBook };