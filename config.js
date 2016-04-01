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
    assetsPath: '/wp-content/themes/plushogskolan-web/assets/',
    //anonymousToken: '98c285fd-477f-46ad-ad5e-ff20ce91823f',
    //signUpToken: 'c983f13f-4279-4d66-8d94-dea41144f4d5',
    //appName: 'tippeliganold',
    anonymousToken: 'fd9d52a9-e2c5-41df-ac97-91a17125963b',
    signUpToken: '66ccdd39-4461-42cb-a3fe-503b10820be6',
    appName: 'tippeligan',
    deadline: '2016-06-10T00:00:00',
    cacheTime: 10000,
  },
  prod: {
    sitename: 'Tippeligan',
    hostname: 'http://tippeligan.se',
    apiEndpoint: 'https://api.backand.com',
    assetsPath: '/wp-content/themes/plushogskolan-web/assets/',
    anonymousToken: '98c285fd-477f-46ad-ad5e-ff20ce91823f',
    signUpToken: 'c983f13f-4279-4d66-8d94-dea41144f4d5',
    deadline: '2016-06-10T00:00:00',
    cacheTime: 3600000,
  },
};