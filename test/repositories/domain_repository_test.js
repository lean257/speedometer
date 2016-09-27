const expect = require('expect.js');
const testHelper = require('./../test-helper');
const domainRepository = require('../../repositories/domain-repository');

describe('DomainRepository', () => {
  describe('#save()', () => {
    afterEach(() => testHelper.resetTable('domains'));

    it('returns a domain', () => {
      const domain = { uri: 'https://www.google.com', httpMethod: 'GET', alternateId: Date.now() };
      const promise = domainRepository.save(domain);

      return promise.then((data) => {
        const { id, uri, httpMethod, alternateId } = data;
        expect(data).to.have.keys(['id', 'alternateId', 'uri', 'httpMethod']);
        expect(id).to.be.a('number');
        expect(alternateId).to.be.a('number');
        expect(alternateId).to.be(domain.alternateId);
        expect(uri).to.be(domain.uri);
        expect(httpMethod).to.be(domain.httpMethod);
      });
    });

    it('rejects wihtout id', () => {
      const domain = { uri: 'https://www.google.com', httpMethod: 'GET' };
      const promise = domainRepository.save(domain);

      return promise.catch(({ id, uri, httpMethod }) => {
        expect(id).to.be(undefined);
        expect(uri).to.be(domain.uri);
        expect(httpMethod).to.be(httpMethod, domain.httpMethod);
      });
    });
  });
});
