'use strict';


const express = require('express');
const router = express.Router();
const http = require('http');
const request = require('request');
const feed = require('./models/feed');
const db = require('./models/dbutils');


/**
 * Shows panel index.
 */
router.get('/', (req, res, next) => {
    db.getUnreadMeetings().then((docs) => {
        feed.getFeed(function(err, events) {
            if (err) console.log(err);
            res.render('panel/index', {
                events: events
            });
        });
    });
});


router.get('/home', (req, res, next) => {
    res.render('panel/home');
});


/**
 * Lists all of the meeting answers from a given user.
 */
router.get('/user/:id', (req, res, next) => {
    res.json({'user': 'isAwesome'});
});



module.exports = router;
