'use strict';



const mongo = require('./mongo');
const redis = require('./redis');



/**
 * Connect all databases at once.
 *
 * @returns {Promise}
 */
module.exports.connect = () => {
    return Promise.all([
        mongo.connect(),
        redis.connect()
    ]);
};
