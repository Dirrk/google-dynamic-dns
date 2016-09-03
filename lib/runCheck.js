'use strict';

module.exports = function runCheck () {

    return this.getPublicIP()
        .then((ip) => {
            return 'Your public ip is ' + ip;
        });
};
