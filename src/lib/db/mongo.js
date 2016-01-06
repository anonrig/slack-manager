'use strict';



const mongoose = require('mongoose');
const config = require('../../config');


mongoose.Promise = global.Promise;


/**
 * Connect Mongo.
 *
 * @returns {Promise}
 */
module.exports.connect = () => {
    return new Promise((resolve, reject) => {
        let connection = mongoose.connect('mongodb://' +
            config.get('mongo:host') + '/' + config.get('mongo:db'));

        mongoose.connection.once('open', resolve);
        mongoose.connection.on('error', reject);
    });
};
