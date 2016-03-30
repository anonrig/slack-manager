'use strict';



const config = require('../config');
const redis = require('node-redis');



/**
 * Aims to ease not-so-readable Redis functions.
 * Acts as a wrapper.
 */
class redisClient {

    /**
     * constructor - redisClient
     */
    constructor() {
        this.client = require('../lib/db/redis').redis,
    }



    /**
     * set - Saves key-value pair to Redis.
     *
     * @param  {String} key
     * @param  {Object} value
     * @return {Promise}
     */
    set(key, value) {
        let that = this;

        return new Promise((resolve, reject) => {
            that.client.hmset(key, value, (err) => {
                if (err) return reject(err);

                resolve();
            });
        });
    }


    /**
     * get - Gets a key's value.
     *
     * @param  {String} key
     * @return {Promise}
     */
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
