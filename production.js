'use strict';

var webpack_config_prod = require('./production.config.js');
var config = require('./config.js');

module.exports = webpack_config_prod(config);