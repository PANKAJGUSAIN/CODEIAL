const express = require('express');
//express router module
const router =express.Router();

router.use('/posts',require('./posts'));

router.use('/users',require('./users'));

module.exports =router;
