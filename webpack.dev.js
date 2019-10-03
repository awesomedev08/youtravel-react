const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, 'src', 'client', 'index.js'),
  mode: 'development',
  devtool: 'source-map',
  stats: 'none',
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].bundle.js',
    path: path.join(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: '/\.js$/',
        exclude: /node_modules/,
        loader: ['babel-loader', 'eslint-loader'],
      }, {
        // Apply rule for .sass, .scss or .css files
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
        // Set loaders to transform files.
        // Loaders are applying from right to left(!)
        // The first loader will be applied after others
        use: [
          {
            // Creates "style" nodes from JS strings
            loader: 'style-loader',
          }, {
            // This loader resolves url() and @imports inside CSS
            loader: 'css-loader',
          }, {
            // First we transform SASS to standard CSS
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({
      // Simulate the removal of files
      dry: true,
      // Write Logs to Console
      verbose: true,
      // Automatically remove all unused webpack assets on rebuild
      cleanStaleWebpackAssets: true,
      protectWebpackAssets: false,
    }),
    new webpack.HashedModuleIdsPlugin(),
    new HtmlWebPackPlugin({
      title: 'DEV: YouTravel',
      template: './src/client/views/index.html',
      filename: './index.html',
    }),
    new WorkboxWebpackPlugin.InjectManifest({
      swDest: 'sw.js',
      swSrc: './src/client/sw.js',
    }),
  ],
};
