// routes/booksRoutes.js
const express = require('express');
const { getBooks, countBooks } = require('../controller/books.controller');

const router = express.Router();

router.get('/books', getBooks);
router.get('/books/count', countBooks);

module.exports = router;
