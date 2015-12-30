'use strict';



const config = require('../config');
const redis = require('node-redis');


class redisClient {
    constructor() {
        this.client = require('../lib/db/redis').redis,
    }


    set(key, value) {
        let that = this;

        return new Promise((resolve, reject) => {
            that.client.hmset(key, value, (err) => {
                if (err) return reject(err);

                resolve();
            });
        });
    }


    get(key) {
        let that = this;

        return new Promise((resolve, reject) => {
            that.client.hgetall(key, (err, result) => {
                if (err) return reject(err);

                resolve(result);
            })
        });
    }
}


module.exports = redisClient;
