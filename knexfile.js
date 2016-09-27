// Update with your config settings.
module.exports = {
  development: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    pool: { min: 2, max: 10 },
    migrations: { tableName: 'knex_migrations' },
  },
  test: {
    client: 'postgresql',
    connection: process.env.TEST_DATABASE_URL,
    pool: { min: 1, max: 1 },
    migrations: { tableName: 'knex_migrations' },
  },
};
