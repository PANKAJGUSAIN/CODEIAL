const express = require('express');
//express router module
const router =express.Router();
//
const passport =require('passport');

// moving to the controller
const homeController =require('../controllers/user');

router.get('/profile/:id',passport.checkAuthentication,homeController.profile);

router.get('/sigin',homeController.signin);

router.get('/login',homeController.login);

router.get('/signout',homeController.destroySession);

//to take data
router.post('/create',homeController.create);

//to check session
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/user/sigin'},
), homeController.createSession);


module.exports =router;