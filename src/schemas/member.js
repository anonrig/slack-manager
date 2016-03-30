'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let Member = new Schema({
    slackId: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    email: {type: String, required: true},
    img: {type: String}
});


Member.statics.findBySlackId = function(slackId) {
    return this.findOne({slackId: slackId});
};

Member.statics.findById = function(id) {
    return this.findOne({_id: id});
};


module.exports = mongoose.model('Member', Member);
