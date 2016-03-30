'use strict';


const db = require('./lib/db');


db
    .connect()
    .then(() => {
        const app = require('./app');

        return app.listenServer();
    })
    .catch((err) => {
        console.error('Cannot boot API', err);
        process.exit(0);
    });
