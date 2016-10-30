const crypto = require('crypto');

const cryptoMock = {
  getRandomValues() {
    crypto.randomBytes(16);
  },
};

Object.defineProperty(window, 'crypto', { value: cryptoMock });
