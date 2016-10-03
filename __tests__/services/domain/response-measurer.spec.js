const chai = require('chai');
const responseMeasurer = require('../../../server/services/domain/response-measurer');

chai.use(require('dirty-chai'));

const expect = chai.expect;

describe('responseMeasurer', () => {
  describe('#run()', () => {
    it('returns ok status with a valid host', () =>
      responseMeasurer('http://www.kommit.co')
        .then((data) => {
          expect(data).to.have.all.keys('status', 'duration', 'statusCode');
          expect(data.status).to.be.ok();

          expect(data.duration).to.be.a('number');
          expect(data.duration).to.be.greaterThan(0);

          expect(data.statusCode).to.be.a('number');
          expect(data.statusCode).to.equal(200);
        })
    );

    it('returns error status with an invalid path', () =>
      responseMeasurer('http://www.kommit.co/foo')
        .catch((data) => {
          expect(data).to.have.keys('status', 'statusCode');
          expect(data.status).to.equal('error');

          expect(data.statusCode).to.be.a('number');
          expect(data.statusCode).to.equal(404);
        })
    );
  });
});
