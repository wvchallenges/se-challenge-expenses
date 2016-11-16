module.exports = {
  entry: [
    './Public/index.js'
  ],
  output: {
    path: __dirname + '/Public/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015']
        }
      }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
}