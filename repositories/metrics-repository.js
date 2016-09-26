const influx = require('influx');

const client = influx(process.env.INFLUXDB_DATABASE_URL);

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
  lastResponseDuration({ uri, elapsedTime = '1h' }) {
    return new Promise((resolve, reject) => {
      const query = `SELECT uri, value from response_time WHERE uri='${uri}' time > now() - ${elapsedTime}`;
      client.queryRaw(query, (err, results) => {
        if (err) {
          reject();
        } else {
          resolve(results);
        }
      });
    });
  },
};

module.exports = repository;
