const express  = require('express');
const { getAllAuthor } = require('../controller/author.controller');
const router = express.Router();



router.get("/authors" ,getAllAuthor);


module.exports = router