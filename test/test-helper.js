const knexConfig = require('./../knexfile')[process.env.NODE_ENV || 'test'];
const knex = require('knex')(knexConfig);

exports.resetTable = tableName => knex(tableName).truncate().then();
