var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, './'),
    filename: 'movie_list.bundle.js'
  },

  module: {
    rules: [
      {
        test: [/\.js$/, /\.jsx?$/],
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['react']
        }
      }
    ]
  },

  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },

  target: 'node',

  externals: {
    'react/addons': true,
    'react/lib/ReactContext': true,
    'react/lib/ExecutionEnvironment': true
  }
}