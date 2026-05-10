exports.up = function (knex) {
  return knex.schema.alterTable('profile', (t) => {
    t.string('occupation', 150);
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable('profile', (t) => {
    t.dropColumn('occupation');
  });
};