'use strict';

const BPromise = require('bluebird'),
    constants = require('./constants');

module.exports = function runDynamic () {
    // Check Current IP
    // Get Current Record IP
    // If Changed Update Google
    // If success write out IP to saved IP

    return BPromise.props({
        record_ip: this.getCurrentRecord(),
        public_ip: this.getPublicIP()
    })
    .then((result) => {
        if (result.record_ip === result.public_ip) {
            return;
        }
        return this.updateRecord();
    })
    .then((new_ip) => {

        if (!new_ip || !new_ip.match(constants.IP_REGEX)) {
            return 'Unchanged';
        }
        return this.saveLocalFile(new_ip);
    });
};
