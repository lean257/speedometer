const domainRepository = require('../../server/repositories/domain-repository');

describe('DomainRepository', () => {
  describe('#save()', () => {
    afterEach(() => dbTestTools.resetTable('domains'));

    it('returns a domain', () => {
      const domain = { uri: 'https://www.google.com', httpMethod: 'GET' };
      const promise = domainRepository.save(domain);

      return promise.then((data) => {
        const { id, uri, httpMethod, metrics } = data;
        expect(data).to.have.all.keys('id', 'uri', 'httpMethod', 'metrics');
        expect(id).to.be.a('number');
        expect(uri).to.equal(domain.uri);
        expect(httpMethod).to.equal(domain.httpMethod);
        expect(metrics).to.be.a('array');
      });
    });

    it('rejects wihtout id', () => {
      const domain = { uri: 'https://www.google.com', httpMethod: 'GET' };
      const promise = domainRepository.save(domain);

      return promise.catch(({ id, uri, httpMethod }) => {
        expect(id).to.be.undefined();
        expect(uri).to.equal(domain.uri);
        expect(httpMethod).to.equal(httpMethod, domain.httpMethod);
      });
    });
  });
});
