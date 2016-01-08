'use strict';



const request = require('request');
const _ = require('lodash');
const config = require('../config');

// TODO: Promisify!
class feed{

    //Get meeting feed too!
    static getFeed(cb) {
        this.getGithubFeed_(null, 15, function(err, events) {
            if (err) cb(err);

            cb(null, events);
        });
    }


    static getGithubFeed_(url, limit, cb) {
        let that = this;
        let options = {
            url: config.get('github:repo') + '?sha=' +
                config.get('github:branch'),
            headers: {
                'User-Agent': 'request'
            }
        };

        request(options, (error, response, body) => {
            if (error) cb(error);

            //Need some checks here or 400 from GitHub is bad news!
            let feedJson = JSON.parse(body);
            that.calculateDate(feedJson.slice(0, 10),
            function(err, editedEvents) {

                if (err) cb(err);

                cb(null, editedEvents);
            });
        });
    }


    static calculateDate(events, cb) {
        _.forEach(events, function(entry) {
            var date2 = new Date(entry.commit.author.date);
            var timeDiff = Math.abs(Date.now() - date2.getTime());
            var diffDays = timeDiff / (1000);

            if ((diffDays / 60) < 60)
                entry.commit.committer.date =
                    Math.ceil(diffDays / (60)) + ' minutes';
            else if ((diffDays / 3600) < 24)
                entry.commit.committer.date =
                    Math.ceil(diffDays / (3600)) + ' hours';
            else
                entry.commit.committer.date =
                    Math.ceil(diffDays / (3600 * 24)) + ' days';
        });

        cb(null, events);
    }
}


module.exports = feed;
