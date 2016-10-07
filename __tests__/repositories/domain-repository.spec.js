const chai = require('chai');
const testHelper = require('./../test-helper');
const domainRepository = require('../../server/repositories/domain-repository');

chai.use(require('dirty-chai'));

const expect = chai.expect;

describe('DomainRepository', () => {
  describe('#save()', () => {
    afterEach(() => testHelper.resetTable('domains'));

    it('returns a domain', (done) => {
      const domain = { uri: 'https://www.google.com', httpMethod: 'GET' };
      const promise = domainRepository.save(domain);

      promise.then((data) => {
        const { id, uri, httpMethod } = data;

        expect(data).to.have.all.keys('id', 'uri', 'httpMethod');
        expect(id).to.be.a('number');
        expect(uri).to.equal(domain.uri);
        expect(httpMethod).to.equal(domain.httpMethod);
        done();
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
