const expect = require('chai').expect;
const request = require('supertest');
const express = require('express');
const domainsApi = require('../../server/api/v1/domains');
const testHelper = require('./../test-helper');

const app = express();
app.use('/api/v1/domains', domainsApi);

describe('POST /api/v1/domains', () => {
  afterEach(() => testHelper.resetTable('domains'));

  it('returns a domain with valid data', (done) => {
    const generatedId = Date.now();
    const payload = { id: generatedId, uri: 'https://www.google.com', httpMethod: 'GET' };
    request(app)
      .post('/api/v1/domains')
      .send(payload)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err, { body }) => {
        expect(body).to.have.all.keys('id', 'uri', 'httpMethod', 'metrics');
        expect(body.id).to.be.a('number');
        expect(body.uri).to.equal(payload.uri);
        expect(body.httpMethod).to.equal(payload.httpMethod);
        expect(body.metrics).to.be.a('array');
        done();
      });
  });
});
