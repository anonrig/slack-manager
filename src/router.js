'use strict';


const express = require('express');
const router = express.Router();


router.use('/', (req, res, next) => {
    res.json({'hello': 'world'});
});


module.exports = router;
