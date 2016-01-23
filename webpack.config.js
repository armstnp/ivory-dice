var webpack = require('webpack');
var minimize = process.argv.indexOf('--no-minimize') === -1 ? true : false;
var plugins = minimize
  ? [new webpack.optimize.UglifyJsPlugin({ minimize: true })]
  : [];

module.exports = {
  entry: './src/ivory-dice.js',
  output: {
    path: './dist',
    filename: minimize ? 'ivory-dice.min.js' : 'ivory-dice.js',
    libraryTarget: 'umd',
    library: 'ivoryDice'
  },
  module: {
    loaders: [{
      test: /\.js?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel'
    }]
  },
  plugins: plugins
};
