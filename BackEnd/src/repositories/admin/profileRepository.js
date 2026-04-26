const { db } = require('../db');

const TABLE = 'profile';

const updateProfile = (data) =>
  db(TABLE).update({ ...data, updated_at: db.fn.now() });

module.exports = { updateProfile };