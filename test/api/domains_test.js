const request = require('supertest');
const expect = require('expect.js');
const express = require('express');
const domainsApi = require('../../api/v1/domains');

const app = express();
app.use('/api/v1/domains', domainsApi);

describe('POST /api/v1/domains', () => {
  it('returns a domain with valid data', () => {
    const generatedId = Date.now();
    const payload = { id: generatedId, uri: 'https://www.google.com', httpMethod: 'GET' };
    request(app)
      .post('/api/v1/domains')
      .send(payload)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err, response) => {
        expect(response).to.have.keys(['id', 'alternateId', 'uri', 'httpMethod']);
        expect(response.id).to.be.a('number');
        expect(response.alternateId).to.be.a('number');
        expect(response.alternateId).to.be(payload.id);
        expect(response.uri).to.be(payload.uri);
        expect(response.httpMethod).to.be(payload.httpMethod);
        expect(response.chartData).to.have.keys(['datasets', 'labels']);
      });
  });
});
