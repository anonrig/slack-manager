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


router.get('/settings', (req, res, next) => {
    if (db.getSetting()) {
        db.getSetting().then((doc) => {
            res.render('panel/settings', {setting: doc});
        });
    }else {
        res.render('panel/settings');
    }
});


router.get('/setting', (req, res, next) => {
    db.getSetting().then((doc) => {
        if(doc)
            res.json(doc);
        else
            res.status(404).send();
    }).catch((err) => {
        res.status(500).send();
    });
});


router.post('/setting/new', (req, res, next) => {
    db.createSetting(req.body).then((doc) => {
        res.send();
    }).catch ((err) => {
        res.statusCode(404).send();
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

router.get('/questions', (req, res, next) => {
    res.render('panel/questions');
});

router.get('/questions/list', (req, res, next) => {
    db.getQuestions().then((doc) => {
        res.json(doc);
    }).catch(() => {
        res.status(500).send();
    });
});

router.post('/questions/new', (req, res, next) => {
    if (req.body.title && req.body.questions) {
        db.createOrUpdateQuestions(req.body).then((doc) => {
            res.json(doc);
        }).catch((err) => {
            res.status(500).send();
        });
    }else {
        res.status(400).send();
    }
});

module.exports = router;
