'use strict';

const Meeting = require('./meeting');
const _ = require('lodash');



class manager {
    constructor() {
        this.meetings = {};
    }

    meetingExist(id) {
        return this.meetings && this.meetings[id];
    }

    create(channelId) {
        let meeting = new Meeting();
        this.meetings[channelId] = meeting;
        return meeting;
    }

    destroy(channelId) {
        this.meetings[channelId] = undefined;
    }
}

module.exports = manager;
