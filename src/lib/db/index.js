'use strict';



const mongo = require('./mongo');
const redis = require('./redis');


module.exports.connect = () => {
    return Promise.all([
        mongo.connect(),
        redis.connect()
    ]);
};
