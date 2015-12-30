const nconf = require('nconf');
const NODE_ENV = process.env.NODE_ENV || 'production';




/**
 * This module uses default.json's configuration data as default.
 *
 * According to your NODE_ENV, for example `test`, test.json is merged with
 * your current default.json
 *
 * A big "thanks!" to nconf guys.
 */
nconf.argv()
    .env()
    .file({ file: 'config/default.json' })
    .file('env', { file: 'config/' + NODE_ENV + '.json' });


module.exports = nconf;
