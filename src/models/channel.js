'use strict';



const config = require('../config');
const slackWebApi = require('botkit/lib/Slack_web_api');
const async = require('async');

class channel {
    constructor(controller) {
        this.controller = controller;

        this.webApi = slackWebApi(controller, {
            token: config.get('token')
        });
    }

    getMembers(channelId) {
        let that = this;

        return new Promise((resolve, reject) => {
            that.webApi.channels.info({
                channel: channelId
            }, (err, res) => {
                if (err) return reject(err);

                resolve(res.channel.members);
            });
        })
        .then((members) => {
            return new Promise((resolve, reject) => {
                let channelMembers = [];

                async.each(members, (member, cb) => {
                    that.webApi.users.info({
                        user: member
                    }, (err, response) => {
                        if (err) return cb(err);

                        // TODO: Fix this in a more clear way.
                        if (response.user.name != 'manager')
                            channelMembers.push(response.user);

                        cb();
                    });
                }, (err, response) => {
                    if (err) return reject(err);

                    resolve(channelMembers);
                });
            });
        });
    }
}


module.exports = channel;
