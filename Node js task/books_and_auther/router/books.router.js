// routes/booksRoutes.js
const express = require('express');
const { getBooks, countBooks, existAudibleBooks } = require('../controller/books.controller');

const router = express.Router();

router.get('/books', getBooks);
router.get('/books/count', countBooks);
router.get('/books/existAudio', existAudibleBooks);

module.exports = router;
