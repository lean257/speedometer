const redis = require('redis');

const namespace = 'pokedom:domain:';

const DomainRepository = {
  namespace,
  adapter: redis.createClient({ prefix: namespace }),
  save({ id, uri, httpMethod }) {
    const promise = new Promise((resolve, reject) => {
      if (!id) {
        reject({ id, uri, httpMethod });
        return;
      }

      this.adapter.hmset(id, { id, uri, httpMethod }, (err, data) => {
        if (err) {
          reject(err, 'An error ocurred saving a new domain');
        } else if (data === 'OK') {
          resolve({ id, uri, httpMethod });
        }
      });
    });
    return promise;
  },
  flush() {
    this.adapter.keys('*', function callback(err, results = []) {
      if (results.lenth > 0) {
        const keys = results.map(key => key.replace(this.namespace, ''));
        this.adapter.del(keys);
      }
    });
  },
};

module.exports = DomainRepository;
