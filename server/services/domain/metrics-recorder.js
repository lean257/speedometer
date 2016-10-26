const responseMeasurer = require('./response-time-meter');
const saveResponseDuration = require('../../repositories/metrics-repository').saveResponseDuration;

const metricsRecorder = uri => new Promise((resolve, reject) => {
  responseMeasurer(uri)
    .then(({ duration }) => saveResponseDuration({ uri, duration }))
    .then(resolve)
    .catch(reject);
});

module.exports = metricsRecorder;
