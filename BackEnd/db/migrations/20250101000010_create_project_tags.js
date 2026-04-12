exports.up = function (knex) {
  return knex.schema.createTable('project_tags', (t) => {
    t.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    t.uuid('project_id').notNullable().references('id').inTable('projects').onDelete('CASCADE');
    t.string('tag', 50).notNullable();
    t.integer('sort_order').notNullable().defaultTo(0);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('project_tags');
};
