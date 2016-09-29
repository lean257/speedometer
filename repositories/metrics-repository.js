const influx = require('influx');

const client = influx(process.env.INFLUXDB_DATABASE_URL);

const groupMetricsByUri = series => series.reduce((accumulated, { uri, time, value }) => {
  const measures = accumulated[uri] || [];
  return Object.assign({}, accumulated, { [uri]: [...measures, { time, value }] });
}, {});

const repository = {
  saveResponseDuration({ uri, duration }) {
    return new Promise((resolve, reject) => {
      client.writePoint('response_duration', duration, { uri }, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  },
  lastResponseDurationOfUris(uris, elapsedTime = '1h') {
    return new Promise((resolve, reject) => {
      const scapedUris = uris.map(uri => uri.replace(/\//g, '\\/')).join('|');
      const query = `SELECT uri, value FROM response_duration WHERE uri =~ /(${scapedUris})/ AND time > now() - ${elapsedTime}`;
      client.query(query, (err, series) => {
        if (err) {
          reject(err);
        } else {
          resolve(groupMetricsByUri(series[0]));
        }
      });
    });
  },
};

module.exports = repository;
