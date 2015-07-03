const path = require('path');
const plugins = require('./webpack/plugins');
const postcss = require('./webpack/postcss');
const loaders = require('./webpack/loaders');

const devmode = process.env.NODE_ENV !== 'production';

function getEntrySources(sources) {
  if (devmode) {
    sources.push('webpack-hot-middleware/client?reload=true');
  }
  return sources;
}

module.exports = {
  entry: {
    app: getEntrySources(['./src/index.js']),
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: process.env.NODE_ENV === 'production' ?
      '[name].[chunkhash].js' : '[name].js',
    publicPath: '/',
    sourceMapFilename: process.env.NODE_ENV === 'production' ?
      '[name].[chunkhash].js.map' : '[name].js.map',
    chunkFilename: process.env.NODE_ENV === 'production' ?
      '[name].chunk.[chunkhash].js' : '[name].js',
  },
  resolve: {
    root: path.resolve(__dirname, 'src'),
    alias: {
      actions: 'actions',
      actionTypes: 'actionTypes',
      api: 'api',
      components: 'components',
      constants: 'constants',
      containers: 'containers',
      reducers: 'reducers',
      routes: 'store/routes',
      sagas: 'sagas',
      store: 'store',
      styles: 'styles',
    },
  },
  devtool: !devmode ? 'source-map' : 'inline-source-map',
  plugins: plugins,
  module: {
    loaders: [
      loaders.css,
      loaders.js,
      loaders.json,
    ],
  },
  postcss: postcss,
  externals: {
    'react/lib/ReactContext': 'window',
    'react/lib/ExecutionEnvironment': 'window',
    'react/addons': true,
  },
};
