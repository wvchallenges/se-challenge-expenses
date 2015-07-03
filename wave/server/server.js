const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3000;
const routes = require('./routes');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('../webpack.config.js');

const distPath = path.join(__dirname, '../dist');
const indexFileName = 'index.html';
const app = express();

// routing
app.use('/api/v1', routes);

// serve files (webpack for dev)
if (process.env.NODE_ENV !== 'production') {
  const compiler = webpack(webpackConfig);
  const middleware = webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: {
      colors: true,
      chunks: false,
      'errors-only': true
    }
  });
  app.use(middleware);
  app.use(webpackHotMiddleware(compiler, {
    log: console.log
  }));
  app.get('*', (req, res) => {
    res.write(middleware.fileSystem.readFileSync(path.join(distPath, indexFileName)));
    res.end();
  });
} else {
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, indexFileName))
  });
}

// start listening
app.listen(PORT, (err) => {
  if (err) {
    return;
  }
});
