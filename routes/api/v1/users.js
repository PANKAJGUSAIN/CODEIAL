const express = require('express');
//express router module
const router =express.Router();

const usersAPI=require('../../../controllers/api/v1/users_api');

router.post('/create-session',usersAPI.createSession);
module.exports =router;