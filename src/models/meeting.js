'use strict';

const _ = require('lodash');
const MailerModel = require('./mailer');
const config = require('../config');
const async = require('async');

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


        return new Promise((resolve, reject) => {

            async.eachSeries(that.participants, (participant, cb) => {
                message.user = participant.id;

                bot.startConversation(message, (err, convo) => {
                    convo.say('Hello @' + participant.name +
                        ', it is your turn now.');

                    let userAnswers = [];

                    _.forEach(that.questions, (question, index) => {
                        convo.ask(that.questions[index], (msg, convo) => {
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

                        cb();
                    });
                });
            }, (err) => {
                if(err) return reject(err);

                bot.say({
                    text: 'Meeting has ended. Results are mailed to ' + config.get('mail:to'),
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
