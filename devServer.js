const path = require('path');
const express = require('express');
const webpack = require('webpack');
const config = require('./webpack.config.dev');
const log = require('./logger')('React');

const app = express();
const compiler = webpack(config);
const PORT = process.env.PORT || 3300;

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, 'localhost', (err) => {
  if (err) {
    return;
  }

  log.info(`DevServer Listening at http://localhost:${PORT} NODE_ENV=${process.env.NODE_ENV}`);
});
