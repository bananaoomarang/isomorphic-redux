var path      = require('path');
var webpack   = require('webpack');
var prodCfg   = require('./webpack.prod.config');

Object.assign = require('object-assign');

module.exports = Object.assign(prodCfg, {
  entry:  [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './client'
  ],
  output: {
      filename: 'bundle.js',
      publicPath: 'http://localhost:8080/',
  },
  module: {
    loaders: [
      {
        test:    /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel']
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  devtool: 'inline-source-map',
  devServer: {
    hot: true,
    proxy: {
      '*': 'http://localhost:' + (process.env.PORT || 3000)
    }
  }
});
