'use strict';

const nodemailer = require('nodemailer');
const config = require('../config');
const jade = require('jade');



class mailer {
    /**
     * @constructor
     *
     * @param  {String} content
     */
    constructor(content, opt_settings) {
        this.content = content;

        this.transporter = nodemailer.createTransport(opt_settings || {
            service: config.get('mailer:service'),
            auth: {
                user: config.get('mailer:email'),
                pass: config.get('mailer:pass')
            }
        });

        this.options = {
            from: config.get('mail:from'),
            to: config.get('mail:to'),
            subject: 'About your meeting today',
            html: content || 'No body.'
        };
    }


    /**
     * send - Sends an email with pre-set settings.
     */
    send() {
        this.transporter.sendMail(this.options);
    }


    static mailify(answers) {
        let html = jade.renderFile('./src/views/email.jade', {
            data: answers
        });
        return html;
    }
}


module.exports = mailer;
