let redis = require('redis');
let namespace = 'pokedom:domain:';

let DomainRepository = {
  namespace,
  adapter: redis.createClient({prefix: namespace}),
  save({id, uri, httpMethod}) {
    return new Promise((resolve, reject) => {
      if (!id) {
        return reject({id, uri, httpMethod});
      }
      this.adapter.hmset(id, {id, uri, httpMethod}, (err, data) => {
        if (err) {
          reject(err, 'An error ocurred saving a new domain');
        } else if (data == 'OK') {
          resolve({id, uri, httpMethod});
        }
      });
    });
  },
  flush() {
    this.adapter.keys('*', function(err, results = []) {
      if (results.lenth > 0) {
        keys = results.map((key)=> {
          return key.replace(this.namespace, '');
        });
        this.adapter.del(keys);
      }
    });
  }
};

module.exports = DomainRepository;
