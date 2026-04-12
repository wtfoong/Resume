exports.up = function (knex) {
  return knex.schema.createTable('experience_details', (t) => {
    t.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    t.uuid('experience_id').notNullable().references('id').inTable('experience').onDelete('CASCADE');
    t.text('detail').notNullable();
    t.integer('sort_order').notNullable().defaultTo(0);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('experience_details');
};
