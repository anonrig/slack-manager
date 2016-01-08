'use strict';


const mongoose = require('mongoose');
const Participant = require('./participant');
const Schema = mongoose.Schema;
const BBPromise = require('bluebird');
const db = require('../models/dbutils');
const _ = require('lodash');


let Meeting = new Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    humandDate: {type: String, },
    participants: {type: Array, required: true},
    isRead: {type: Boolean, default: false}
});


Meeting.methods.read = function() {
    this.isRead = true;
    return this.save();
};

Meeting.statics.findByIsRead = function(isRead) {
    return this.find({isRead: isRead}).sort({createdAt: 'desc'});
};

Meeting.statics.findById = function(id) {
    return this.findOne({_id: id});
};

Meeting.statics.findByMemberId = function(memberId) {
    return this.find({'members.id': memberId});
};


module.exports = mongoose.model('Meeting', Meeting);
