'use strict';

const Member = require('../schemas/member');
const Meeting = require('../schemas/meeting');
const Participant = require('../schemas/participant');
const Setting = require("../schemas/settings");
const Questions = require("../schemas/questions");
const _ = require('lodash');
const BBPromise = require('bluebird');
const async = require('async');


class dbutils {

    static findOneAndUpdateMember(members) {
        //Does in parallel.
        let tasks = [];
        _.forEach(members, (member) => {
            let query = Member.findOneAndUpdate({
                slackId: member.id
            }, {
                slackId: member.id,
                name: member.profile.real_name,
                email: member.profile.email,
                img: member.profile.image_72
            }, {
                upsert: true
            });

            tasks.push(query);
        });

        Promise.all(tasks).then((response) => {}).catch((err) => {});
    }


    static createMeeting(entries) {

        let tasks = [];
        _.forEach(entries, (entry) => {
            let query = Member.findBySlackId(entry.participant.id);
            tasks.push(query);
        });

        let participants = [];
        Promise.all(tasks).then((members) => {
            BBPromise.each(members, (member, index) => {
                let participant = new Participant({
                    memberRef: member._id,
                    answers: entries[index].answer
                });
                participants.push(participant);
            }).then(() => {
                let meeting = new Meeting({
                    participants: participants
                });

                meeting.save().then(() => {}).catch((err) => {
                    console.log(err);
                });
            }).catch();
        });
    }


    static getUnreadMeetings() {
        return Meeting.findByIsRead(false);
    }


    static readMeeting(id) {
        Meeting.findById(id).then((meeting) => {
            meeting.read();
        });
    }


    static getMeetingContent(isRead) {
        return new Promise((resolve, reject) => {
            Meeting.findByIsRead(isRead).then((docs) => {
                //Should it be moved to another place?
                let weekday = new Array(7);
                weekday[0] = 'Monday';
                weekday[1] = 'Tuesday';
                weekday[2] = 'Wednesday';
                weekday[3] = 'Thursday';
                weekday[4] = 'Friday';
                weekday[5] = 'Saturday';
                weekday[6] = 'Sunday';

                BBPromise.each(docs, (doc) => {
                    let date = new Date(doc.createdAt);
                    doc.humandDate = weekday[date.getDay()] + ' - ' +
                        date.getDate() + '.' + (date.getMonth() + 1) +
                            '.' + date.getFullYear();
                }).then((editedDocs) => {
                    resolve(editedDocs);
                }).catch((err) => {
                    reject(err);
                    console.log('dbutils line 79.' + err);
                });
            }).catch((err) => {
                reject(err);
            });
        });
    }

    static getMeetingById(id) {
        return Meeting.findById(id);
    }

    static getMeetingDetail(meeting) {
        let tasks = [];
        _.forEach(meeting.participants, (participant) => {
            let query = Member.findById(participant.memberRef);
            tasks.push(query);
        });
        return new Promise((resolve, reject) => {
            Promise.all(tasks).then((members) => {
                BBPromise.each(meeting.participants, (participant, index) => {
                    participant.name = members[index].name;
                    participant.img = members[index].img;
                }).then(() => {
                    resolve(meeting)
                });
            });
        });
    }

    static createSetting(request) {
        //Should be checked here?
        return Setting.findOneAndUpdate({}, {
            slackToken: request.slackToken,
            mailer: request.mailer ? request.mailer : "",
            mail: request.mail ? request.mail : "",
            mongo: request.mongo,
            github: request.github ? request.github : ""
        }, {
            upsert: true
        });
    }

    static getSetting() {
        return Setting.findSetting();
    }

    static getQuestions() {
        return Questions.findAll();
    }

    static createOrUpdateQuestions(questionsObj) {
        return Questions.findOneAndUpdate({title: questionsObj.title}, {
            title: questionsObj.title,
            questions: questionsObj.questions
        }, {
            upsert: true
        });
    }
}


module.exports = dbutils;
