exports.up = function (knex) {
  return knex.schema.createTable('alerts', (table) => {
    table.increments('id').primary();

    table.integer('event_id').notNullable();
    table.string('severity').notNullable(); // LOW | MEDIUM | HIGH
    table.string('reason').notNullable();

    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('alerts');
};
