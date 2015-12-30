'use strict';



const express = require('express');
const app = express();
const server = require('http').Server(app);
const config = require('./config');


app.enable('trust proxy');
app.disable('x-powered-by');

app.set('views', 'src/views');
app.set('view engine', 'jade');

app.use(require('./router'));


app.listenServer = () => {
    return new Promise((resolve, reject) => {
        server.listen(config.get('http:port'), (err) => {
            if (err) return reject(err);

            resolve();
            console.info('API booted successfully');
        });
    });
};

app.bot = require('./bot');


module.exports = app;
