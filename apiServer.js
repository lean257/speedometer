const express = require('express');
const schedule = require('node-schedule');
const kue = require('kue');
const repository = require('./server/repositories/domain-repository');
const metricsRecorder = require('./server/services/domain/metrics-recorder');
const cors = require('cors');

const QUEUE_POOL_SIZE = 10;
const PORT = process.env.API_PORT || 4000;

const queue = kue.createQueue();
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.all('/*', cors());

app.use('/api/v1', require('./server/api/v1'));

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

queue.process('response-time-meter', QUEUE_POOL_SIZE, ({ data }, done) => {
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
        queue.create('response-time-meter', domain)
          .removeOnComplete(true).save());
    });
});

server.listen(PORT, (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log(`API Listening at http://localhost:${PORT} NODE_ENV=${process.env.NODE_ENV}`);
});
