const express = require('express');
const router = express.Router();
const http = require('http');
const db = require('../models/dbutils');

/**
 * Lists a specific meeting result.
 */
router.get('/meeting/:id', (req, res, next) => {
    db.getMeetingById(req.params.id).then((doc) => {
        if(doc && !doc.isRead)
            db.readMeeting(req.params.id);
        db.getMeetingDetail(doc).then((content) => {
            res.render('panel/meeting', {
                meeting: content
            });
        }).catch((err) => {
            console.log(err);
        });
    });
});


router.get('/unread', (req, res, next) => {
    db.getMeetingContent(false).then((docs) => {
        res.render('panel/meetings', {
            meetings: docs
        });
    }).catch((err) => {
        console.log(err);
    });
});


router.get('/archive', (req, res, next) => {
    db.getMeetingContent(true).then((docs) => {
        res.render('panel/meetings', {
            meetings: docs
        });
    }).catch((err) => {
        console.log(err);
    });
});


router.get('/unread/count', (req, res, next) => {
    db.getUnreadMeetings().then((meetings) => {
        res.json({
            meetingCount: meetings.length
        });
    }).catch(() => {
        res.json({
            meetingCount: '0'
        });
    });
});


module.exports = router;
