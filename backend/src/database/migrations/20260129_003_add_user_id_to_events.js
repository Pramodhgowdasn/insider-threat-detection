// migrations/xxxx_add_user_id_to_events.js
exports.up = function (knex) {
  return knex.schema.table('events', (table) => {
    table
      .integer('user_id')
      .unsigned()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
  });
};

exports.down = function (knex) {
  return knex.schema.table('events', (table) => {
    table.dropColumn('user_id');
  });
};
