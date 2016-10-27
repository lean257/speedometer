/* global jasmine */
/* eslint no-undef: "error" */

const crypto = require('crypto');

jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;

const cryptoMock = {
  getRandomValues() {
    crypto.randomBytes(16);
  },
};

Object.defineProperty(window, 'crypto', { value: cryptoMock });

jest.mock('../server/repositories/metrics-repository', () =>
  Object.assign({}, {
    lastResponseDurationOfUris() {
      return new Promise((resolve) => {
        resolve([]);
      });
    },
  })
);
