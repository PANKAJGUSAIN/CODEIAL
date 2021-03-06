const express = require('express');
//express router module
const router =express.Router();
//
const passport =require('passport');

// moving to the controller
const homeController =require('../controllers/user');

router.get('/profile/:id',passport.checkAuthentication,homeController.profile);
router.post('/update/:id',passport.checkAuthentication,homeController.update);

router.get('/sigin',homeController.signin);

router.get('/login',homeController.login);

router.get('/signout',homeController.destroySession);

//to take data
router.post('/create',homeController.create);

//use passport as a middleware to authenticate
//to check session
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/user/login'},
), homeController.createSession);

//google auth
router.get('/auth/google',passport.authenticate('google',{scope :['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect :'/user/sigin'}),homeController.createSession);


module.exports =router;