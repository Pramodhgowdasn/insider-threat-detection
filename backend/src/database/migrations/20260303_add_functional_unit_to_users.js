exports.up = function (knex) {
  return knex.schema.table('users', (table) => {
    table.string('functional_unit');
  });
};

exports.down = function (knex) {
  return knex.schema.table('users', (table) => {
    table.dropColumn('functional_unit');
  });
};
