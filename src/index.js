'use strict';

const config = require('./config');

const Botkit = require('botkit/lib/Botkit.js');
const controller = Botkit.slackbot({
    debug: false
});
const ManagerModel = require('./models/manager');
const manager = new ManagerModel(controller);
const managerProcess = controller.spawn({
        token: config.get('token')
    });

managerProcess
    .startRTM((err, bot, payload) => {
        if (err) return console.error('Error: ', err);
    });
