const request = require('request');

const responseMeasurer = uri => new Promise((resolve, reject) => {
  request(uri, { time: true, timeout: 10000 }, (error, response) => {
    if (error) {
      reject({ status: 'error', code: error.code, errno: error.errno });
    } else if (response.statusCode === 200) {
      resolve({ status: 'ok', duration: response.elapsedTime, statusCode: response.statusCode });
    } else {
      reject({ status: 'error', statusCode: response.statusCode });
    }
  });
});


module.exports = responseMeasurer;
