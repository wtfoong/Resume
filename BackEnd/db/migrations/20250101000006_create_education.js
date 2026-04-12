exports.up = function (knex) {
  return knex.schema.createTable('education', (t) => {
    t.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    t.string('institution', 150).notNullable();
    t.string('degree', 150).notNullable();
    t.string('field', 150);
    t.date('start_date').notNullable();
    t.date('end_date');
    t.decimal('gpa', 3, 2);
    t.integer('sort_order').notNullable().defaultTo(0);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('education');
};
