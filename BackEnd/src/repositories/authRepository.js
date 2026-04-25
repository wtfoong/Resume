const db = require('./db');

const findAdminByEmail = (email) =>
  db('admin_users').where({ email }).first();

const findAdminById = (id) =>
  db('admin_users').where({ id }).first();

const findAdminByResetToken = (token) =>
  db('admin_users').where({ reset_token: token }).first();

const updateAdminPassword = (id, passwordHash) =>
  db('admin_users').where({ id }).update({ password_hash: passwordHash });

const updateAdminEmail = (id, email) =>
  db('admin_users').where({ id }).update({ email });

const saveResetToken = (id, token, expiresAt) =>
  db('admin_users').where({ id }).update({
    reset_token: token,
    reset_token_expires_at: expiresAt,
  });

const clearResetToken = (id) =>
  db('admin_users').where({ id }).update({
    reset_token: null,
    reset_token_expires_at: null,
  });

const updateLastLogin = (id) =>
  db('admin_users').where({ id }).update({ last_login: db.fn.now() });

const saveRefreshToken = (id, token, expiresAt) =>
  db('admin_users').where({ id }).update({
    refresh_token: token,
    refresh_token_expires_at: expiresAt,
  });

const findAdminByRefreshToken = (token) =>
  db('admin_users').where({ refresh_token: token }).first();

const clearRefreshToken = (id) =>
  db('admin_users').where({ id }).update({
    refresh_token: null,
    refresh_token_expires_at: null,
  });

module.exports = {
  findAdminByEmail,
  findAdminById,
  findAdminByResetToken,
  findAdminByRefreshToken,
  updateAdminPassword,
  updateAdminEmail,
  saveResetToken,
  clearResetToken,
  saveRefreshToken,
  clearRefreshToken,
  updateLastLogin,
};