const webpack = require('webpack');
const path = require('path');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); // require webpack plugin
// const OptimizeCSSAssets = require('optimize-css-assets-webpack-plugin');

const destinationPath = (process.env.NODE_ENV === 'production') ? 'distr' : 'public';

const config = {
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, `./${destinationPath}`)
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules)/,
      loader: 'babel-loader'
    },
      {
      test: /\.css$/,
      use: ExtractTextWebpackPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'postcss-loader'],
      }),
    }
    ]
  },
  plugins: [
    new ExtractTextWebpackPlugin('styles.css')
  ]
};

module.exports = config;

if (process.env.NODE_ENV === 'production') { // if we're in production mode, here's what happens next
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin(), // call the uglify plugin
    // new OptimizeCSSAssets(),
  );
}