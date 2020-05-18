const express = require('express');
//express router module
const router =express.Router();
//

// moving to the controller
const homeController =require('../controllers/index');

router.get('/',homeController.home);

router.use('/user', require('./user'));

router.use('/post', require('./posts'));
//exporting this module
module.exports =router;
//