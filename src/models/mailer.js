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
            text: content || 'No body.'
        };
    }


    /**
     * send - Sends an email with pre-set settings.
     */
    send() {
        this.transporter.sendMail(this.options);
    }

    static mailify(answers, channelName){
        let mailContent = 'Hello, \nToday\'s meeting results for #'+ channelName + ' are shown below.\n';
        answers.forEach((answer) => {
            mailContent += "\n" + answer.participant.real_name + " responded:\n\n";
            answer.answer.forEach((entry, index) => {
                mailContent += entry.question + "\n" + entry.answer + "\n";
            });
        });

        return mailContent;
    }
}


module.exports = mailer;
