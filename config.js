'use strict';

module.exports = {
  sourcecodeDir: 'sourcecode',
  entryFile: 'sourcecode/index.js',
  outputDir: 'production',
  outputFile: 'js.js',
  outputDevFile: 'bundle.js',
  confFile: 'config.js', // file to use for config variables in app

  // Variables to use in app
  dev: {
    sitename: 'Tippeligan',
    hostname: 'http://tippeligan.se',
    apiEndpoint: 'https://api.backand.com',
    assetsPath: '/',
    appName: 'tippeligan',
    deadline: '2016-06-10T00:00:00',
    cacheTime: 10000,
    AppID: '6050D0F6-022F-8002-FF1B-D5CDDC447000',
    AppSecret: '1B00EBD5-6975-C0B0-FF08-86DE29587700',
    AppVersion: 'v1',
  },
  prod: {
    sitename: 'Tippeligan',
    hostname: 'http://tippeligan.se',
    apiEndpoint: 'https://api.backand.com',
    assetsPath: '/assets/',
    deadline: '2016-06-10T00:00:00',
    cacheTime: 1800000,
    AppID: '762DFB83-2BFC-4FDE-FF84-49EF9AF03000',
    AppSecret: 'E61DDBB5-D389-9076-FF9B-E4262579E000',
    AppVersion: 'v1',
  },
};