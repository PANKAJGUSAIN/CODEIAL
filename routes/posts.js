const express = require('express');
//express router module
const router =express.Router();
//
const passport =require('passport');

const postController =require('../controllers/post');

//post or add a questioner
router.post('/create',postController.post_content);

module.exports =router;