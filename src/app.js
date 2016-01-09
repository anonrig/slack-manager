'use strict';



const express = require('express');
const app = express();
const server = require('http').Server(app);
const config = require('./config');
const bodyParser = require('body-parser');


app.enable('trust proxy');
app.disable('x-powered-by');


/**
 * Use Jade for templating engine.
 */
app.set('views', 'src/views');
app.set('view engine', 'jade');


app.use('/public', express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Redirect all urls to router.
 */
app.use('/meetings', require('./routers/meetings'));
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

//Prevents app to collapse. But what about call stack? Hmm.
process.on('uncaughtException', function(err) {
    console.log(err);
});

app.bot = require('./bot');


module.exports = app;
