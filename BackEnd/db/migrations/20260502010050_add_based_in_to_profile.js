exports.up = function (knex) {
  return knex.schema.alterTable('profile', (t) => {
    t.string('based_in', 100);
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable('profile', (t) => {
    t.dropColumn('based_in');
  });
};