exports.up = (knex, Promise) => Promise.all([
  knex.schema.createTable('domains', (table) => {
    table.increments();
    table.string('uri');
    table.string('http_method');
    table.string('alternate_id');
    table.timestamps();
  }),
]);

exports.down = (knex, Promise) => Promise.all([
  knex.schema.dropTable('domains'),
]);
