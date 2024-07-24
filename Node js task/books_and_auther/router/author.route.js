const express  = require('express');
const { getAllAuthor, countAuthors, countAuthorBooks } = require('../controller/author.controller');
const router = express.Router();



router.get("/authors" ,getAllAuthor);
router.get("/authors/count" ,countAuthors);
router.get("/authors/countAuthorBooks" ,countAuthorBooks);


module.exports = router