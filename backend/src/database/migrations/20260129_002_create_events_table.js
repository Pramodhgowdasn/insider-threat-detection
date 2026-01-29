exports.up = async function (knex) {
  const exists = await knex.schema.hasTable('events');

  if (!exists) {
    return knex.schema.createTable('events', (table) => {
      table.increments('id').primary();
      table.string('event_type').notNullable();
      table.string('source').notNullable();
      table.jsonb('metadata');
      table.timestamp('created_at').defaultTo(knex.fn.now());
    });
  }
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('events');
};
