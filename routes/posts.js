const express = require('express');
//express router module
const router =express.Router();
//
const passport =require('passport');

const postController =require('../controllers/post');

//post or add a questioner
router.post('/create',passport.checkAuthentication,postController.post_content);

//to delete post
router .get('/destroy/:id',passport.checkAuthentication,postController.destroy);
module.exports =router;