const production = process.env.NODE_ENV === 'production';

const jsloaders = [];
if (production) {
  jsloaders.push('babel?sourceMaps=true');
} else {
  jsloaders.push('babel?sourceMaps=both');
}

exports.css = {
  test: /\.css$/,
  loader: 'style-loader!css?-minimize!postcss',
};

exports.js = {
  test: /\.jsx?$/,
  loaders: jsloaders,
  exclude: /node_modules/,
};

exports.json = {
  test: /\.json$/,
  loader: 'json-loader',
};
