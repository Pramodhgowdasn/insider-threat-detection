exports.up = function (knex) {
  return knex.schema.createTable('alerts', table => {
    table.increments('id').primary();
    table.integer('user_id').references('id').inTable('users').onDelete('SET NULL');
    table.string('type').notNullable();
    table.string('severity').notNullable();
    table.text('message').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('alerts');
};
