var webpack = require('webpack');
var path = require('path');
var autoprefixer = require('autoprefixer');

module.exports = function (config) {
  return {
    entry: path.resolve(__dirname, config.entryFile),
    // Set variableDir as moduleDirectory so that
    // variables will be found using @import '~variables.less';
    resolve: {
      root: path.resolve(__dirname),
      alias: {
        conf: path.resolve(__dirname, config.confFile),
      },
      extensions: ['', '.js', '.less', '.jsx', '.json'],
      modulesDirectories: ["web_modules", "node_modules", config.sourcecodeDir],
    },
    loader: {
      configEnvironment: 'prod',
    },
    output: {
      path: path.resolve(__dirname, config.outputDir),
      filename: config.outputFile,
      publicPath: '/'
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': `"production"`
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {warnings: false}
      }),
    ],
    module: {
      loaders: [
        {
          test: /\.js?$/,
          exclude: /node_modules/,
          loader: 'babel',
          query: {
            presets: ['react', 'es2015', 'stage-0']
          }
        },
        {
          test: /\.less$|\.css$/,
          include: path.resolve('./sourcecode'),
          loader: 'style-loader?singleton!css-loader?modules&localIdentName=[name]---[local]---[hash:base64:5]!postcss-loader!less-loader',
        },
      ]
    },
    postcss: [
      // Lost is the grid system
      require('lost'),
      autoprefixer({browsers: ['last 2 versions']})
    ],
  };
};