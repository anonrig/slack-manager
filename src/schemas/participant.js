'use strict';


const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Member = require('./member');


let Participant = new Schema({
    memberRef: {type: Schema.Types.ObjectId, ref: 'Member', required: true},
    answers: {type: Array, required: true},
    isDismissed: {type: Boolean, default: false}
});


module.exports = mongoose.model('Participant', Participant);
