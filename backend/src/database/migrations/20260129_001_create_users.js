exports.up = async function (knex) {
  const exists = await knex.schema.hasTable('users');
  if (!exists) {
    return knex.schema.createTable('users', (table) => {
      table.increments('id').primary();
      table.string('username').notNullable().unique();
      table.string('email').unique();
      table.string('role');
      table.string('functional_unit'); // Added to match CERT r4.2 context
      table.timestamps(true, true);
    });
  } else {
    // If table exists, add functional_unit column if it doesn't exist
    const hasColumn = await knex.schema.hasColumn('users', 'functional_unit');
    if (!hasColumn) {
      return knex.schema.table('users', (table) => {
        table.string('functional_unit');
      });
    }
  }
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('users');
};
