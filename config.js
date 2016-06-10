'use strict';

module.exports = {
  sourcecodeDir: 'sourcecode',
  entryFile: 'sourcecode/index.js',
  outputDir: 'production',
  outputFile: 'js.js',
  outputDevFile: 'bundle.js',
  confFile: 'config.js',

  dev: {
    sitename: 'Tippeligan',
    hostname: 'http://tippeligan.se',
    apiEndpoint: 'https://api.backand.com',
    deadline: '2016-06-10T18:00:00',
    cacheTime: 0,
    AppID: '6050D0F6-022F-8002-FF1B-D5CDDC447000',
    AppSecret: '1B00EBD5-6975-C0B0-FF08-86DE29587700',
    // AppID: '762DFB83-2BFC-4FDE-FF84-49EF9AF03000',
    // AppSecret: 'E61DDBB5-D389-9076-FF9B-E4262579E000',
    AppVersion: 'v1',
  },
  prod: {
    sitename: 'Tippeligan',
    hostname: 'http://tippeligan.se',
    apiEndpoint: 'https://api.backand.com',
    deadline: '2016-06-10T18:00:00',
    cacheTime: 3600000,
    AppID: '762DFB83-2BFC-4FDE-FF84-49EF9AF03000',
    AppSecret: 'E61DDBB5-D389-9076-FF9B-E4262579E000',
    AppVersion: 'v1',
  },
};