var path = require('path')
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var projectRoot = path.resolve(__dirname, './src')

module.exports = {
  entry: './src/app.js',
  output: {
    path: './dist',
    filename: 'build.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      include: projectRoot,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }, {
      test: /.vue$/,
      exclude: /node_modules/,
      loader: 'vue'
    }, {
      test: /.less$/,
      exclude: /node_modules/,
      loader: 'style!css!less'
    }],
    vue: {
      loaders: {
        less: ExtractTextPlugin.extract('css!less')
      }
    },
    plugins: [
      new ExtractTextPlugin('style.css')
    ]
  }
}
