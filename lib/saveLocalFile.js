'use strict';

const fs = require('fs');

module.exports = function saveLocalFile(ip) {

    return fs.writeFileAsync(this.file, ip, 'utf8')
        .then(() => {
            return ip;
        });
};
