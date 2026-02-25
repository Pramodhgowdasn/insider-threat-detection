exports.up = function (knex) {
  return knex.schema.createTable('cases', (table) => {
    table.increments('id').primary();
    table.string('title').notNullable();
    table.text('description');
    table.string('status').notNullable().defaultTo('OPEN'); // OPEN, IN_PROGRESS, CLOSED
    table.string('priority').notNullable().defaultTo('MEDIUM'); // LOW, MEDIUM, HIGH, CRITICAL
    table.integer('assignee_id').references('id').inTable('users').onDelete('SET NULL');
    table.integer('creator_id').references('id').inTable('users').onDelete('SET NULL');
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('cases');
};
