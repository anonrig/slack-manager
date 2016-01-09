'use strict';


const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let Setting = new Schema({
    createdAt: {type: Date, default: Date.now},
    slackToken: {type: String, required: true},
    name: {type: String},
    surname: {type: String},
    mailer: {
        service: {type: String},
        email: {type: String},
        pass: {type: String}
    },
    mail: {
        from: {type: String},
        to: {type: String}
    },
    mongo: {
        host: {type: String, default: "localhost"},
        db: {type: String}
    },
    github: {
        repo: {type: String, required: true},
        branch: {type: String, required: true}
    }
});

Setting.statics.findSetting = function() {
    return this.find();
};

module.exports = mongoose.model('Setting', Setting);
