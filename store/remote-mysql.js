const remote = require('./remote-store.service');
const config = require('../config/index');

module.exports = new remote(config.mysqlService.host, config.mysqlService.port);