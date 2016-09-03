'use strict';

const Wreck = require('wreck'),
    constants = require('./constants');

module.exports = function getPublicIP() {

    return Wreck.getAsync(constants.CHECK_IP_URL, {})
        .spread((response, payload) => {

            if (response.statusCode !== 200) {
                return;
            }

            let ip = payload.toString('utf8');

            if (ip.match(constants.IP_REGEX)) {
                return ip;
            }
        });
};
