'use strict';

const _ = require('lodash');
const MailerModel = require('./mailer');
const config = require('../config');
const async = require('async');
const EventEmitter = require('events').EventEmitter;


class meeting {

    /**
     * @constructor
     *
     * @param  {String} channelId
     */
    constructor(channelId) {
        this.channelId = channelId;
        this.questions = [
            'What did you do yesterday?',
            'What are you going to do today?',
            'Did you encounter any problems?'
        ];
        this.answers = [];

        this.eventEmitter = new EventEmitter();
    }

    getEventEmitter() {
        return this.eventEmitter;
    }

    setMembers(members) {
        this.participants = members;
    }


    /**
     * start - Starts a conversation
     *
     * @param  {Object} bot
     * @param  {String} message
     * @return {Promise}
     */
    start(bot, message) {
        let that = this;
        let participantCount = 0;

        return new Promise((resolve, reject) => {
            async.whilst(() => {
                return participantCount < that.participants.length
            },
            (cb) => {
                let participant = that.participants[participantCount];
                message.user = participant.id;

                bot.startConversation(message, (err, convo) => {
                    convo.say('Hello @' + participant.name +
                        ', it is your turn now.');

                    let skipParticipant = () => {
                        that.participants.push(participant);
                        convo.stop();
                    };

                    let dismissParticipant = () => {
                        convo.stop();
                    };

                    that.eventEmitter
                        .once('skip', skipParticipant)
                        .once('dismiss', dismissParticipant);

                    let userAnswers = [];

                    _.forEach(that.questions, (question, index) => {
                        convo.ask(that.questions[index], (msg, convo) => {
                            switch (msg.text) {
                                case 'skip':
                                    that.eventEmitter.emit('skip'); break;
                                case 'dismiss':
                                    that.eventEmitter.emit('dismiss'); break;
                            }

                            userAnswers.push({
                                question: question,
                                answer: msg.text,
                                createdAt: Date.now()
                            });

                            convo.next();
                        });
                    });

                    convo.say('Thank you @' + participant.name);

                    convo.on('end', (msg) => {
                        that.answers.push({
                            participant: participant,
                            answer: userAnswers
                        });

                        that.eventEmitter
                            .removeListener('skip', skipParticipant)
                            .removeListener('dismiss', dismissParticipant);

                        participantCount++;
                        cb();
                    });
                });
            }, (err) => {
                if(err) return reject(err);

                bot.say({
                    text: 'Meeting has ended. Results are mailed to ' +
                        config.get('mail:to'),
                    channel: that.channelId
                });

                let mailContent = MailerModel.mailify(that.answers);
                let mailSender = new MailerModel(mailContent);
                mailSender.send();
                resolve();
            });
        });
    }
};


module.exports = meeting;
