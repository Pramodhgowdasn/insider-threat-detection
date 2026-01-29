exports.up = async function (knex) {
  const exists = await knex.schema.hasTable('users');
  if (!exists) {
    return knex.schema.createTable('users', (table) => {
      table.increments('id').primary();
      table.string('username').notNullable().unique();
      table.string('email').unique();
      table.string('role');
      table.timestamps(true, true);
    });
  }
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('users');
};
