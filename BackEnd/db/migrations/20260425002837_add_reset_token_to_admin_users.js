/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable('admin_users', (t) => {
    t.string('reset_token', 255);
    t.timestamp('reset_token_expires_at');
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable('admin_users', (t) => {
    t.dropColumn('reset_token');
    t.dropColumn('reset_token_expires_at');
  });
};