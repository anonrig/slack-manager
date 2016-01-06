'use strict';

const Member = require('../schemas/member');
const Meeting = require('../schemas/meeting');
const Participant = require('../schemas/participant');
const _ = require('lodash');


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
                email: member.profile.email
            }, {
                upsert: true
            });

            tasks.push(query);
        });

        Promise.all(tasks).then((response) => {}).catch((err) => {});
    }


    static createMeeting(entries) {
        let participants = [];
        //Promise.each is not a function :(
        _.forEach(entries, (entry) => {
            let id = Member.findBySlackId(entry.participant.id)._id;
            let answers = entry.answer;
            let participant = new Participant({
                memberId: id,
                answers: answers
            });
            participants.push(participant);
        });

        let meeting = new Meeting({
            participants: participants
        });

        meeting.save().then(() => {
            //Update client with a socket notif.
        }).catch((err) => {});
    }


    static getUnreadMeetings() {
        return new Promise((resolve, reject) => {
            Meeting.findUnreads().then((docs) => {
                resolve(docs.length);
            }).catch((err) => {
                reject(err);
            });
        });
    }

}


module.exports = dbutils;
