// routes/booksRoutes.js
const express = require('express');
const { getBooks } = require('../controller/books.controller');

const router = express.Router();

router.get('/books', getBooks);

module.exports = router;
