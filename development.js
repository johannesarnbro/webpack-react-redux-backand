var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var themeConfig = require('./config.js');
var webpack_config_dev = require('./development.config.js');
var config = webpack_config_dev(themeConfig);

new WebpackDevServer(webpack(config), {
  contentBase: 'sourcecode',
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  inline: true,
  progress: true,
  stats: {
    colors: true,
  },
}).listen(2016, 'localhost', function (err) {
  if (err) {
    console.log(err);
  }
  console.log('Listening at localhost:2016');
});
