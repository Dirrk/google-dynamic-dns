# Google Dynamic DNS Tool
Easy to use cli tool that will call the google domains api and update your dynamic dns.  Google Dynamic DNS can be setup [here](https://domains.google.com/) and how to do it can be read [here](https://support.google.com/domains/answer/6069273).  The tool can be used in place of having a dynamic dns application installed or set up on your router.  To use this as a DynamicDNS replacement this should be setup on a cron (linux/mac) or windows task.

## Dependencies
* nodejs > 4.x.x

## Install
```
npm -g install google-dynamic-dns
```

## CLI
#### Options
```
Options:
  --help                  Prints this help message
  --username, --user, -u  Username provided by your google domains account
  --password, --pass, -p  Password provided by your google domains account
  --hostname, --host, -h  Dynamic host in your google domains account example host.example.com
  --dynamic, -d           Run in dynamic mode that acts as a dyndns tool that updates the api in a cron job
  --check, -c             Just check my public ip
  --verbose, -v           Display debugging information

```

#### Environment Variables
```
GDDNS_USERNAME=username
GDDNS_PASSWORD=password
GDDNS_HOSTNAME=host.example.com
```

#### Usage
```
# Update the DynamicDNS
gddns --username=username --password=password --hostname=host.example.com

# Alternatively you can use environment variables to supplement any command line argument

GDDNS_USERNAME=username GDDNS_PASSWORD=password GDDNS_HOSTNAME=host.example.com gddns

# Or use any combination
GDDNS_USERNAME=username GDDNS_PASSWORD=password gddns -h host.example.com

# Check your public ip
gddns -c
```

## DynamicDNS Replacment

#### Setup
1. Install nodejs 4 ([Linux](https://nodejs.org/en/download/)/[OSX](https://nodejs.org/dist/v4.5.0/node-v4.5.0.pkg)/[Windows](https://nodejs.org/dist/v4.5.0/node-v4.5.0-x64.msi))
2. Install google-dynamic-dns `npm -g install google-dynamic-dns`
3. For Linux/OSX add the following line to your crontab `*/5 * * * * gddns -d -u username -p password -h host.example.com`
