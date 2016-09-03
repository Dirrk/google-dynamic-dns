'use strict';

const fs = require('fs'),
    dns = require('dns'),
    Wreck = require('wreck'),
    constants = require('./constants');

module.exports = function getCurrentRecord() {

    return fs.statAsync(this.file)
        .then(() => {
            return fs.readFileAsync(this.file, 'utf8');
        })
        .then((ip) => {
            if (ip && ip.match(constants.IP_REGEX)) {
                return ip;
            }
        })
        .catch((e) => {
            if (this.verbose) {
                console.log(e.message);
            }
        })
        .then((ip) => {
            if (ip) {
                return [ip];
            }

            return dns.resolve4Async(this.hostname);
        })
        .then((ip) => {
            if (ip && ip.length) {
                return ip[0];
            }
        });
};
