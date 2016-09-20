/* global describe it afterEach*/
const assert = require('assert');
const redis = require('redis');
const domainRepository = require('../../repositories/domain-repository');

// Redis setup
const namespace = `pokedom:domain:${process.env.NODE_ENV}:`;
const client = redis.createClient({ prefix: namespace });

domainRepository.adapter = client;
domainRepository.namespace = namespace;

describe('DomainRepository', () => {
  describe('#save()', () => {
    afterEach(() => domainRepository.flush());

    it('returns a domain', () => {
      const generatedId = Date.now();
      const domain = { id: generatedId, uri: 'https://www.google.com', httpMethod: 'GET' };
      const promise = domainRepository.save(domain);

      return promise.then(({ id, uri, httpMethod }) => {
        assert.equal(id, domain.id);
        assert.equal(uri, domain.uri);
        assert.equal(httpMethod, domain.httpMethod);
      });
    });

    it('rejects wihtout id', () => {
      const domain = { uri: 'https://www.google.com', httpMethod: 'GET' };
      const promise = domainRepository.save(domain);

      return promise.catch(({ id, uri, httpMethod }) => {
        assert.equal(id, undefined);
        assert.equal(uri, domain.uri);
        assert.equal(httpMethod, domain.httpMethod);
      });
    });
  });
});
