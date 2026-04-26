const { db, findBy } = require('./db');

const findAdminByEmail = (email) =>
  findBy('admin_users', { email }, { first: true });

const findAdminById = (id) =>
  findBy('admin_users', { id }, { first: true });

const findAdminByResetToken = (token) =>
  findBy('admin_users', { reset_token: token }, { first: true });

const findAdminByRefreshToken = (token) =>
  findBy('admin_users', { refresh_token: token }, { first: true });

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

const saveRefreshToken = (id, token, expiresAt) =>
  db('admin_users').where({ id }).update({
    refresh_token: token,
    refresh_token_expires_at: expiresAt,
  });

const findAdminByRefreshToken2 = (token) =>
  findBy('admin_users', { refresh_token: token }, { first: true });

const clearRefreshToken = (id) =>
  db('admin_users').where({ id }).update({
    refresh_token: null,
    refresh_token_expires_at: null,
  });

const updateLastLogin = (id) =>
  db('admin_users').where({ id }).update({ last_login: db.fn.now() });

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