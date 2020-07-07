const express = require('express');
//express router module
const router =express.Router();

router.use('/v1',require('./v1'));
module.exports =router;