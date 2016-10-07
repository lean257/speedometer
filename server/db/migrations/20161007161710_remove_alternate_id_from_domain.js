exports.up = (knex, Promise) => Promise.all([
  knex.schema.table('domains', (table) => {
    table.dropColumn('alternate_id');
  }),
]);

exports.down = (knex, Promise) => Promise.all([
  knex.schema.table('domains', (table) => {
    table.string('alternate_id');
  }),
]);
