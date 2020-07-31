const express = require('express');
//express router module
const router =express.Router();

const likesController = require('../controllers/like');


router.post('/toggle', likesController.toggleLike);


module.exports = router;