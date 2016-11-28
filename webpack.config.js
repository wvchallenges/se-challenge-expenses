const webpack = require('webpack');

module.exports = {
  devtool: 'inline-sourcemap',
  entry: './src/client/index.js',
  output: {
    path: './public',
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
  ],
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.json$/,
        loader: 'json',
      },
      {
        test: /\.(css|scss)$/,
        loaders: ['style', 'css', 'sass'],
      },
      {
        test: /\.(jpeg|png|gif|svg)$/i,
        loader: 'url',
      },
    ],
    resolve: {
      extensions: ['.js', '.jsx'],
    },
  },
};
