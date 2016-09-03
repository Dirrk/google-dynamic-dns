//#/usr/bin/node
'use strict';

const BPromise = require('bluebird'),
    Wreck = require("wreck"),
    argv = require('optimist'),
    GoogleDynamicDNS = require('./lib'),
    help = [
        'Google Dynamic DNS Tool',
        'Usage: $0 --username=username --password=password --hostname=host.example.com',
        ''
    ].join('\n');

let gd,
    settings = argv.usage(help)
    .string(['username', 'password', 'hostname'])
    .boolean(['help', 'verbose', 'dynamic', 'check'])
    .describe('help', 'Prints this help message')
    .describe('username', 'Username provided by your google domains account')
    .describe('password', 'Password provided by your google domains account')
    .describe('hostname', 'Dynamic host in your google domains account example host.example.com')
    .describe('dynamic', 'Run in dynamic mode that acts as a dyndns tool that updates the api in a cron job')
    .describe('check', 'Just check my public ip')
    .describe('verbose', 'Display debugging information')
    .alias({
        username: ['user', 'u'],
        password: ['pass', 'p'],
        hostname: ['host', 'h'],
        dynamic: 'd',
        check: 'c',
        verbose: 'v'
    })
    .default({
        username: process.env.GDDNS_USERNAME,
        password: process.env.GDDNS_PASSWORD,
        hostname: process.env.GDDNS_HOSTNAME
    })
    .wrap(120)
    .check((check) => {
        if (check.verbose) {
            console.log('Username: ', check.username);
            console.log('Password: ', check.password);
            console.log('Hostname: ', check.hostname);
        }
        if (check.check) {
            return true;
        }
        return !!(check.username && check.password && check.hostname);
    })
    .argv;

if (settings.help) {
    return argv.showHelp();
}

function run() {
    const gd = new GoogleDynamicDNS(settings);

    let prom;

    if (settings.dynamic) {
        prom = gd.runDynamic()
            .then((status) => {
                if (settings.verbose) {
                    return 'Completed with status ' + status;
                }
            });
    } else if (settings.check) {
        prom = gd.runCheck();
    } else {
        prom = gd.runUpdate();
    }

    prom.then((response) => {
        if (response) {
            console.log(response);
        }
        process.exit();
    })
    .catch(eHandler);
}

// Handle Errors
function eHandler(err) {
    if (settings.verbose) {
        console.error(err);
    }
    process.exit(1);
}

// Promisify
BPromise.promisifyAll(require('fs'));
BPromise.promisifyAll(require('dns'));
Wreck.getAsync = (function (uri, options) {

    return new BPromise((resolve, reject) => {

        Wreck.get(uri, options, (err, response, payload) => {
            if (err) {
                return reject(err);
            }
            resolve([response, payload]);
        });
    });
}).bind(Wreck);

// Start the service
run();
