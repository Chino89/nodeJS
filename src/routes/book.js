const express = require('express');
const router = express.Router()

const {bookController} = require("../controllers")


// // Crear libro (*) (AUTH)
router.post("/:bookId", bookController.createBook);



router.get("/:bookId", (req, res) => {
    console.log(`book found with id ${req.params.bookId}`)
    res.json({ id: req.params.bookId, ...req.body})
});

const errorHandler = (err, req, res, next) => {
    if (err.message === 'Book already exist' ) {
        res.status(400)
        res.json({ message:`File ${bookFile} already exist`})
    } else {
        res.status(500)
        res.json({message: err.message})
    }
};

router.use(errorHandler);

module.exports = router;