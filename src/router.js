'use strict';


const express = require('express');
const router = express.Router();



/**
 * Lists all of the existing meetings.
 */
router.get('/', (req, res, next) => {
    res.json({'hello': 'world'});
});


/**
 * Lists a specific meeting result.
 */
router.get('/meeting/:id', (req, res, next) => {
    res.json({'example': 'meeting'});
});


/**
 * Lists all of the meeting answers from a given user.
 */
router.get('/user/:id', (req, res, next) => {
    res.json({'user': 'isAwesome'});
});



module.exports = router;
