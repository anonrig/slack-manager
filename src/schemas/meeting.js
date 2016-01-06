'use strict';


const mongoose = require('mongoose');
const Participant = require('./participant');
const Schema = mongoose.Schema;


let Meeting = new Schema({
    createdAt: {type: Date, default: Date.now()},
    participants: {type: Array, required: true},
    isRead: {type: Boolean, default: false}
});


Meeting.methods.read = function() {
    this.isRead = true;
    return this;
};

Meeting.statics.findUnreads = function() {
    return this.find({isRead: false});
};

Meeting.statics.findByMemberId = function(memberId) {
    return this.find({'members.id': memberId});
};


module.exports = mongoose.model('Meeting', Meeting);
