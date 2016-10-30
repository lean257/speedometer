/* global jasmine */

const chai = require('chai');
const dirtyChai = require('dirty-chai');
const knexConfig = require('./../knexfile')[process.env.NODE_ENV || 'test'];
const knex = require('knex')(knexConfig);

chai.use(dirtyChai);

jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;

global.jestExpect = global.expect;
global.expect = chai.expect;

global.dbTestTools = {
  resetTable(tableName) {
    knex(tableName).truncate();
  },
};
