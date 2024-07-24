const express  = require('express');
const { getAllAuthor, countAuthors } = require('../controller/author.controller');
const router = express.Router();



router.get("/authors" ,getAllAuthor);
router.get("/authors/count" ,countAuthors);


module.exports = router