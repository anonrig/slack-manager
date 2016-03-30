'use strict';



const config = require('../../config');


/**
 * Create Redis client.
 */
const redis = module.exports.redis = require('redis').createClient({
    host: config.get('redis:host'),
    port: config.get('redis:port')
});


/**
 * Connect Redis.
 *
 * @returns {Promise}
 */
module.exports.connect = () => {
    return new Promise((resolve, reject) => {
        redis.on('ready', resolve);
        redis.on('error', reject);
    });
};
