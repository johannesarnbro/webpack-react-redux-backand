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
    apiEndpoint: 'https://api.backand.com:443',
    assetsPath: '/wp-content/themes/plushogskolan-web/assets/',
    cacheTime: 10000,
  },
  prod: {
    sitename: 'Tippeligan',
    hostname: 'http://tippeligan.se',
    apiHostName: 'https://api.backand.com:443',
    apiEndpoint: '',
    assetsPath: '/wp-content/themes/plushogskolan-web/assets/',
    cacheTime: 3600000,
  },
};