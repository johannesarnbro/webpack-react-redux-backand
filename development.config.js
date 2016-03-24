var webpack = require('webpack');
var path = require('path');

module.exports = function (config) {

  return {
    entry: [
      'webpack-dev-server/client?http://localhost:2016', // WebpackDevServer host and port
      'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
      path.resolve(__dirname, config.entryFile),
    ],
    // Set variableDir as moduleDirectory so that
    // variables will be found using @import '~variables.less';
    resolve: {
      root: path.resolve(__dirname),
      alias: {
        conf: path.resolve(__dirname, config.confFile),
      },
      extensions: ['', '.js', '.less', '.jsx', '.json'],
      modulesDirectories: ["web_modules", "node_modules", config.themeDir, config.sourcecodeDir],
    },
    devtool: "eval",
    loader: {
      configEnvironment: 'dev',
    },
    output: {
      publicPath: '/',
      path: path.resolve(__dirname, config.sourcecodeDir),
      filename: config.outputDevFile,
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
    ],
    postcss: [
      // Grid system
      require('lost'),
    ],
    module: {
      loaders: [
        {
          test: /\.less$|\.css$/,
          include: path.resolve(__dirname, config.sourcecodeDir),
          loader: 'style-loader?singleton!css-loader?modules&localIdentName=[name]---[local]---[hash:base64:5]!postcss-loader!less-loader',
        },
        {
          test: /\.js[x]?$/,
          include: path.resolve(__dirname, config.sourcecodeDir),
          exclude: /node_modules/,
          loaders: ['react-hot', 'babel']
        },
      ]
    },
  }
};