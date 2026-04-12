exports.up = function (knex) {
  return knex.schema.createTable('projects', (t) => {
    t.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    t.string('title', 150).notNullable();
    t.text('description');
    t.string('github_url', 255);
    t.string('live_url', 255);
    t.boolean('is_published').notNullable().defaultTo(true);
    t.integer('sort_order').notNullable().defaultTo(0);
    t.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('projects');
};
