require('dotenv').config({ path: '../.env' });

module.exports = {
  development: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    pool: { min: 2, max: 10 },
    migrations: { directory: './migrations' },
    seeds:      { directory: './seeds' },
  },
  production: {
    client: 'postgresql',
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }, // required for Railway
    },
    pool: { min: 2, max: 10 },
    migrations: { directory: './migrations' },
    seeds:      { directory: './seeds' },
  },
};
