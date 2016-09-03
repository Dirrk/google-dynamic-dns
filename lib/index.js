'use strict';

const path = require('path');

function GoogleDynamicDNS (settings) {
    this.username = settings.username;
    this.password = settings.password;
    this.hostname = settings.hostname;
    this.verbose = !!settings.verbose;
    this.file = path.join(__dirname, '../.ipcache');
};

module.exports = GoogleDynamicDNS;

// Commands
GoogleDynamicDNS.prototype.runDynamic = require('./runDynamic');
GoogleDynamicDNS.prototype.runCheck = require('./runCheck');
GoogleDynamicDNS.prototype.runUpdate = require('./runUpdate');

// Utilities
GoogleDynamicDNS.prototype.getCurrentRecord = require('./getCurrentRecord');
GoogleDynamicDNS.prototype.getPublicIP = require('./getPublicIP');
GoogleDynamicDNS.prototype.updateRecord = require('./updateRecord');
GoogleDynamicDNS.prototype.saveLocalFile = require('./saveLocalFile');
