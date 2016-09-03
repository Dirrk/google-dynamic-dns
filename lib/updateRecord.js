'use strict';

const Url = require('url'),
    Wreck = require('wreck'),
    constants = require('./constants'),
    opts = {
        headers: {
            'User-Agent': 'Nodejs/4.x.x google-dynamic-dns'
        }
    };

module.exports = function updateRecord() {

    let url,
        request = {
        protocol: 'https:',
        host: 'domains.google.com',
        pathname: '/nic/update',
        auth: this.username + ':' + this.password,
        query: {
            hostname: this.hostname
        }
    };

    url = Url.format(request);

    return Wreck.getAsync(url, opts)
        .spread((response, payload) => {
            let ip = payload.toString('utf8').match(constants.IP_REGEX);

            if (this.verbose) {
                console.log(payload.toString('utf8'));
            }
            if (ip) {
                return ip[1];
            }
    });

};
