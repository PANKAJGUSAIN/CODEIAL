const express = require('express');
//express router module
const router =express.Router();

const postsApi =require('../../../controllers/api/v1/Post_api');

router.get('/',postsApi.index);

router.delete('/:id',postsApi.destroy);

module.exports =router;