/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable('admin_users', (t) => {
    t.string('refresh_token', 255);
    t.timestamp('refresh_token_expires_at');
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable('admin_users', (t) => {
    t.dropColumn('refresh_token');
    t.dropColumn('refresh_token_expires_at');
  });
};