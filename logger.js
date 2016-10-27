const bunyan = require('bunyan');

module.exports = (logName) => {
  if (process.env.NODE_ENV === 'test') {
    return bunyan.createLogger({
      name: logName,
      streams: [{ stream: process.stdout, level: 'fatal' }],
    });
  }

  return bunyan.createLogger({ name: logName });
};
