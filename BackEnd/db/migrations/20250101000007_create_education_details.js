exports.up = function (knex) {
  return knex.schema.createTable('education_details', (t) => {
    t.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    t.uuid('education_id').notNullable().references('id').inTable('education').onDelete('CASCADE');
    t.text('detail').notNullable();
    t.integer('sort_order').notNullable().defaultTo(0);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('education_details');
};
