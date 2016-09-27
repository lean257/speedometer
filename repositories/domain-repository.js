const knexConfig = require('./../knexfile')[process.env.NODE_ENV || 'development'];
const knex = require('knex')(knexConfig);
const bookshelf = require('bookshelf')(knex);

bookshelf.plugin('registry');

const Domain = bookshelf.model('Domain', { tableName: 'domains', hasTimestamps: true });

const recordToObject = ({ attributes }) => Object.assign({}, {
  id: attributes.id,
  uri: attributes.uri,
  httpMethod: attributes.http_method,
  alternateId: attributes.alternate_id,
});

const DomainRepository = {
  save({ uri, httpMethod, alternateId }) {
    return new Promise((resolve, reject) => {
      if (!alternateId) {
        reject({ uri, httpMethod, alternateId });
        return;
      }

      Domain
        .forge({ uri, http_method: httpMethod, alternate_id: alternateId })
        .save()
        .then(record => resolve(recordToObject(record)))
        .catch(reject);
    });
  },
  all() {
    return new Promise((resolve, reject) => {
      Domain.fetchAll()
        .then(records => resolve(records.map(recordToObject)))
        .catch(reject);
    });
  },
};

module.exports = DomainRepository;
