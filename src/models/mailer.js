'use strict';

const nodemailer = require('nodemailer');
const config = require('../config');


class mailer {
    /**
     * @constructor
     *
     * @param  {String} content
     */
    constructor(content, opt_settings) {
        this.content = content;
        this.transporter = nodemailer.createTransport(opt_settings || {});
        this.options = {
            from: config.get('mail:from'),
            to: config.get('mail:to'),
            subject: 'About your meeting today',
            text: content || 'No body.'
        };
    }
    send() {
        this.transporter.sendMail(this.options);
    }
}


module.exports = mailer;
