const knexConfig = require('./../../knexfile')[process.env.NODE_ENV || 'development'];
const knex = require('knex')(knexConfig);
const bookshelf = require('bookshelf')(knex);
const metricsRepository = require('./metrics-repository');

bookshelf.plugin('registry');

const Domain = bookshelf.model('Domain', { tableName: 'domains', hasTimestamps: true });

const recordToObject = ({ attributes }) => Object.assign({}, {
  id: attributes.id,
  uri: attributes.uri,
  httpMethod: attributes.http_method,
});

const mergeMetrics = (object, metrics) => {
  const uriMetrics = metrics[object.uri] || [];
  return Object.assign({}, object, { metrics: uriMetrics });
};

const DomainRepository = {
  save({ uri, httpMethod }) {
    return new Promise((resolve, reject) => {
      if (!uri) {
        reject({ uri, httpMethod });
        return;
      }

      Domain
        .forge({ uri, http_method: httpMethod })
        .save()
        .then(record => recordToObject(record))
        .then((object) => {
          const uris = [object.uri];
          return metricsRepository.lastResponseDurationOfUris(uris, metricsRepository.DEFAULT_LIMIT)
            .then((metrics) => {
              resolve(mergeMetrics(object, metrics));
            });
        })
        .catch(reject);
    });
  },
  all() {
    return new Promise((resolve, reject) => {
      Domain.fetchAll()
        .then(records => records.map(recordToObject))
        .then(objects => {
          return Object.assign({}, { objects, uris: objects.map(({ uri }) => uri) })
        })
        .then(({ objects, uris }) => {
          metricsRepository.lastResponseDurationOfUris(uris, metricsRepository.DEFAULT_LIMIT)
            .then((metrics) => {
              resolve(objects.map(object => mergeMetrics(object, metrics)));
            });
        })
        .catch(reject);
    });
  },
  delete(id) {
    return new Promise((resolve, reject) => {
      Domain.query().whereIn('id', 1).del()
      .then(destroyed => resolve('deleted successfully'))
      .catch(reject)
    })
  }
};

module.exports = DomainRepository;
