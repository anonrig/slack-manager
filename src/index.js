'use strict';

const config = {
    port: 3000,
    token: 'xoxb-17065016470-hFTAT0RNh0NkRSLBRStDZ7Nn'
};

const Botkit = require('botkit/lib/Botkit.js');

const controller = Botkit.slackbot({
    debug: false
});


const ManagerModel = require('./models/manager');
const manager = new ManagerModel();


controller
    .hears(['start meeting'], 'ambient', (bot, message) => {
        let channelId = message.channel;

        if (manager.meetingExist(channelId))
            return bot.say(message,
                'Sorry, there is an existing meeting in this channel');

        let meeting = manager.create(channelId);

        meeting
            .start(bot, message)
            .then(() => {
                console.log('Conversation ended. Destroying...');

                meeting.destroy(channelId);
            });
    });


const managerProcess = controller.spawn({
        token: config.token
    })
    .startRTM((err, bot, payload) => {
        if (err) return console.error('Error: ', err);
    });
