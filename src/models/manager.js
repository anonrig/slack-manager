'use strict';

const Meeting = require('./meeting');
const _ = require('lodash');



class manager {
    constructor(controller) {
        this.meetings = {};
        this.controller = controller;
        this.bindEvents_();
    }

    meetingExist(channelId) {
        return this.meetings[channelId];
    }

    create(channelId) {
        let meeting = new Meeting();
        this.meetings[channelId] = meeting;
        return meeting;
    }

    destroy(channelId) {
        this.meetings[channelId] = null;

    }

    bindEvents_() {
        let that = this;

        this.controller
            .hears(['start meeting'], 'ambient', (bot, message) => {
                let channelId = message.channel;

                if (that.meetingExist(channelId))
                    return bot.reply(message,
                        'Sorry, there is an existing meeting in this channel');

                let meeting = that.create(channelId);

                meeting
                    .start(bot, message)
                    .then(() => {
                        that.destroy(channelId);
                    });
            });
    }
}

module.exports = manager;
