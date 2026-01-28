exports.up = function (knex) {
  return knex.schema.createTable('events', (table) => {
    table.increments('id').primary();

    table.string('event_type').notNullable();
    table.string('source').notNullable();

    table.jsonb('metadata');

    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('events');
};
