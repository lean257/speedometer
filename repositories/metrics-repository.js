const influx = require('influx');

const client = influx(process.env.INFLUXDB_DATABASE_URL);
const DEFAULT_LIMIT = 10;

const groupMetricsByUri = series => series.reduce((accumulated, { uri, time, value }) => {
  const measures = accumulated[uri] || [];
  return Object.assign({}, accumulated, { [uri]: [...measures, { time, value }].reverse() });
}, {});

const repository = {
  DEFAULT_LIMIT,
  saveResponseDuration({ uri, duration }) {
    return new Promise((resolve, reject) => {
      client.writePoint('response_duration', duration, { uri }, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve({ [uri]: { value: duration, time: Date.now() } });
        }
      });
    });
  },
  lastResponseDurationOfUris(uris, limit = DEFAULT_LIMIT) {
    return new Promise((resolve, reject) => {
      const scapedUris = uris.map(uri => uri.replace(/\//g, '\\/')).join('|');
      const query = `
        SELECT value
        FROM response_duration
        WHERE uri =~ /(${scapedUris})/
        GROUP BY uri
        ORDER BY time DESC
        LIMIT ${limit}`;

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
