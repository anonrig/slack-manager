'use strict';

const _ = require('lodash');



class meeting {
    constructor(channelId) {
        this.channelId = channelId;
        this.participants = [
            {
                name: 'yagiz',
                id: '5'
            }
        ];
        this.questions = [
            'What did you do yesterday?',
            'What are you going to do today?',
            'Did you encounter any problems?'
        ];
        this.answers = {};
    }


    /**
     * @private
     * @param  {String} answer
     */
    checkAnswers_(answer, convo) {

        switch (answer.text) {
            case 'stop':
                convo.say('Conversation terminated.');
                convo.stop();
                break;
            default:
                break;
        }

    }

    start(bot, message) {
        let that = this;

        return new Promise((resolve, reject) => {
            bot.startConversation(message, (err, convo) => {
                convo.say('Started');

                _.forEach(that.participants, (participant) => {
                    convo.say('Hello @' + participant.name +
                        ', it is your turn now.');

                    that.answers[participant.id] = [];

                    _.forEach(that.questions, (question, index) => {
                        convo.ask(that.questions[index], (msg, convo) => {
                            that.checkAnswers_(msg, convo);

                            that.answers[participant.id].push({
                                question: question,
                                answer: msg.text,
                                createdAt: Date.now()
                            });

                            convo.next();
                        });
                    });

                    convo.say('Thank you @' + participant.name);
                });

                convo.on('end', (convo) => {
                    resolve();
                });
            });
        });
    }
};


module.exports = meeting;
