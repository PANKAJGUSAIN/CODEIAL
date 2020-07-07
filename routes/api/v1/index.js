const express = require('express');
//express router module
const router =express.Router();

router.use('/posts',require('./posts'));

module.exports =router;
