'use strict';


const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let Questions = new Schema({
    createdAt: {type: Date, default: Date.now},
    title: {type: String, required: true},
    questions: {type: Array, required: true}
});


Questions.statics.findByTitle = function (title) {
    return this.find({title: title});
};

Questions.statics.findAll = function () {
    return this.find();
};


module.exports = mongoose.model('Questions', Questions);
