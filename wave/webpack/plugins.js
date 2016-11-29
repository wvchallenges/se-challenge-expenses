const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const basePlugins = [
  new webpack.DefinePlugin({
    __DEV__: process.env.NODE_ENV !== 'production',
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  }),
  new HtmlWebpackPlugin({
    chunksSortMode: 'dependency',
    template: './src/index.html',
    inject: 'body',
  }),
  new webpack.NoErrorsPlugin(),
];

const devPlugins = [
  new webpack.HotModuleReplacementPlugin(),
];

const prodPlugins = [
  new webpack.optimize.UglifyJsPlugin({
    sourceMap: true,
    compress: {
      warnings: false,
    },
  }),
];

module.exports = basePlugins
  .concat(process.env.NODE_ENV === 'production' ? prodPlugins : [])
  .concat(process.env.NODE_ENV === 'development' ? devPlugins : []);
