const express = require('express');
//express router module
const router =express.Router();
//
const passport =require('passport');

const commentController =require('../controllers/comment');

//post or add a questioner
router.post('/create',passport.checkAuthentication,commentController.create);

//delete a comment
router.get('/destroy/:id',passport.checkAuthentication,commentController.destroy);

module.exports =router;