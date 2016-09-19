let assert = require('assert');
let domainRepository = require('../../repositories/domain-repository');

// Redis setup
let redis = require('redis');
let namespace = `pokedom:domain:${process.env.NODE_ENV}:`;
let client = redis.createClient({prefix: namespace});

domainRepository.adapter = client;
domainRepository.namespace = namespace;

describe('DomainRepository', function() {
  describe('#save()', function() {
    afterEach(() => domainRepository.flush());

    it('returns a domain', function() {
      let generatedId = Date.now();
      let domain = {id: generatedId, uri: 'https://www.google.com', httpMethod: 'GET'}
      let promise = domainRepository.save(domain);

      return promise.then(({id, uri, httpMethod}) => {
        assert.equal(id, domain.id);
        assert.equal(uri, domain.uri);
        assert.equal(httpMethod, domain.httpMethod);
      });
    });

    it('rejects wihtout id', function() {
      let domain = {uri: 'https://www.google.com', httpMethod: 'GET'}
      let promise = domainRepository.save(domain);

      return promise.catch(({id, uri, httpMethod}) => {
        assert.equal(id, undefined);
        assert.equal(uri, domain.uri);
        assert.equal(httpMethod, domain.httpMethod);
      });
    });
  });
});
