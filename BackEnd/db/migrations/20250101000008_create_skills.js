exports.up = function (knex) {
  return knex.schema.createTable('skills', (t) => {
    t.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    t.string('category', 100).notNullable();
    t.string('name', 100).notNullable();
    t.integer('sort_order').notNullable().defaultTo(0);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('skills');
};
