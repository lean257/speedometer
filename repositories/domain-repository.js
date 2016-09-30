const knexConfig = require('./../knexfile')[process.env.NODE_ENV || 'development'];
const knex = require('knex')(knexConfig);
const bookshelf = require('bookshelf')(knex);
const metricsRepository = require('./metrics-repository');

bookshelf.plugin('registry');

const Domain = bookshelf.model('Domain', { tableName: 'domains', hasTimestamps: true });

const recordToObject = ({ attributes }) => Object.assign({}, {
  id: attributes.id,
  uri: attributes.uri,
  httpMethod: attributes.http_method,
  alternateId: attributes.alternate_id,
});

const formatChartLabel = label => label.replace(/(\d{2}:\d{2}:\d{2})/, '$1');

const generateChartLabels = (metric) => {
  const d = new Date(metric.time);
  const label = formatChartLabel(`${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`);
  return label;
};

const generateChartValues = metric => metric.value;

const generateChartData = (object, metrics) => {
  const objectMetrics = metrics[object.uri] || [];

  const chartData = {
    labels: objectMetrics.map(generateChartLabels),
    datasets: [{ data: objectMetrics.map(generateChartValues) }],
  };

  return Object.assign({}, object, { chartData });
};

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
        .then(records => records.map(recordToObject))
        .then(objects => Object.assign({}, { objects, uris: objects.map(({ uri }) => uri) }))
        .then(({ objects, uris }) => {
          metricsRepository.lastResponseDurationOfUris(uris, '90s')
            .then((metrics) => {
              resolve(objects.map(object => generateChartData(object, metrics)));
            });
        })
        .catch(reject);
    });
  },
};

module.exports = DomainRepository;
