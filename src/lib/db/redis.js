'use strict';



const config = require('../../config');
const redis = module.exports.redis = require('redis').createClient({
    host: config.get('redis:host'),
    port: config.get('redis:port')
});

module.exports.connect = () => {
    return new Promise((resolve, reject) => {
        redis.on('ready', resolve);
        redis.on('error', reject);
    });
};
