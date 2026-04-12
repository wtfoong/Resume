exports.up = function (knex) {
  return knex.schema.createTable('experience', (t) => {
    t.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    t.string('company', 150).notNullable();
    t.string('role', 150).notNullable();
    t.string('location', 100);
    t.string('employment_type', 50);
    t.date('start_date').notNullable();
    t.date('end_date');
    t.boolean('is_current').notNullable().defaultTo(false);
    t.integer('sort_order').notNullable().defaultTo(0);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('experience');
};
