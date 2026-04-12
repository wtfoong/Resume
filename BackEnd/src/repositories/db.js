const knex = require('knex');
require('dotenv').config();

const db = knex({
  client: 'postgresql',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  },
});

module.exports = db;