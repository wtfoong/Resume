const knex = require('knex');
require('dotenv').config();

const db = knex({
  client: 'postgresql',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  },
});

// ── BASE REPOSITORY FUNCTIONS ──────────────────────────────
const insert = (table, data) =>
  db(table).insert(data).returning('*');

const update = (table, id, data) =>
  db(table).where({ id }).update(data).returning('*');

const deleteById = (table, id) =>
  db(table).where({ id }).delete();

const findAll = (table, { orderBy } = {}) => {
  const query = db(table);
  if (orderBy) query.orderBy(orderBy);
  return query;
};

const findBy = (table, conditions, { orderBy, first, pluck } = {}) => {
  const query = db(table).where(conditions);
  if (orderBy) query.orderBy(orderBy);
  if (pluck) return query.pluck(pluck);
  if (first) return query.first();
  return query;
};

module.exports = { db, insert, update, deleteById, findAll, findBy };