'use strict';



/**
 * Initiate necessary libraries.
 */
const config = require('./config');
const Botkit = require('botkit/lib/Botkit.js');
const controller = Botkit.slackbot({
    debug: false
});
const ManagerModel = require('./models/manager');


/**
 * Instantiate slack bot.
 */
new ManagerModel(controller);

/**
 * Spawn controller and connect to Slack server.
 */
controller
    .spawn({
        token: config.get('token')
    })
    .startRTM((err, bot, payload) => {
        if (err) return console.error('Error: ', err);
    });
