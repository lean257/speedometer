const path = require('path');
const express = require('express');
const webpack = require('webpack');
const config = require('./webpack.config.dev');
const schedule = require('node-schedule');
const kue = require('kue');
const repository = require('./repositories/domain-repository');
const metricsRecorder = require('./services/domain/metrics-recorder');

const queue = kue.createQueue();
const app = express();
const compiler = webpack(config);
const PORT = process.env.PORT || 3000;
const QUEUE_POOL_SIZE = 10;

const io = require('socket.io')(4000);

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

queue.process('response-measurer', QUEUE_POOL_SIZE, ({ data }, done) => {
  const { uri } = data;
  metricsRecorder(uri)
    .then((metrics) => {
      io.emit('uri:metrics', { uri, metrics });
      done();
    }).catch(done);
});

schedule.scheduleJob('* * * * *', () => {
  repository.all()
    .then((collection) => {
      collection.forEach(domain =>
        queue.create('response-measurer', domain)
          .removeOnComplete(true).save());
    });
});

app.use('/api/v1/domains', require('./api/v1/domains'));

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
    console.log(err);
    return;
  }

  console.log(`Listening at http://localhost:${PORT} NODE_ENV=${process.env.NODE_ENV}`);
});
