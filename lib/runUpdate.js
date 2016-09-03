'use strict';

module.exports = function runUpdate() {

    return this.updateRecord()
        .then((ip) => {
            return 'Forced an update to host ' + this.hostname + ' to ip ' + ip;
        });
};
