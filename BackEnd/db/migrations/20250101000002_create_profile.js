exports.up = function (knex) {
  return knex.schema.createTable('profile', (t) => {
    t.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    t.string('full_name', 100).notNullable();
    t.string('tagline', 255);
    t.string('location', 100);
    t.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('profile');
};
