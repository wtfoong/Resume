exports.up = function (knex) {
  return knex.schema.createTable('contacts', (t) => {
    t.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    t.uuid('profile_id').notNullable().references('id').inTable('profile').onDelete('CASCADE');
    t.string('label', 100).notNullable();
    t.string('value', 255).notNullable();
    t.string('url', 255);
    t.integer('sort_order').notNullable().defaultTo(0);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('contacts');
};
