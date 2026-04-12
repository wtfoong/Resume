# Knex Migration Guide

## What is a migration?

A migration is a versioned file that describes a change to your database schema — creating a table, adding a column, dropping an index, etc. Knex runs them in order and tracks which ones have already been applied, so your database schema stays in sync across environments (local, staging, production).

---

## Setup

Install Knex and the PostgreSQL driver:

```bash
npm install knex pg
```

Your `knexfile.js` at the root of your `db/` folder tells Knex where your database is and where to find migrations:

```js
require('dotenv').config();

module.exports = {
  development: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    migrations: { directory: './migrations' },
    seeds:      { directory: './seeds' },
  },
};
```

---

## Creating a migration

Run this to generate a new migration file:

```bash
npx knex migrate:make create_your_table_name
```

This creates a timestamped file in `./migrations/`, e.g.:
```
20250411123000_create_your_table_name.js
```

The timestamp is important — Knex runs migrations in chronological order, so tables that other tables reference (via foreign keys) must be created first.

---

## Anatomy of a migration file

Every migration file exports two functions: `up` and `down`.

```js
exports.up = function (knex) {
  // What to DO — create/alter the table
  return knex.schema.createTable('posts', (t) => {
    t.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    t.uuid('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE');
    t.string('title', 150).notNullable();
    t.text('body');
    t.boolean('is_published').notNullable().defaultTo(false);
    t.integer('sort_order').notNullable().defaultTo(0);
    t.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  // What to UNDO — drop/revert the table
  return knex.schema.dropTable('posts');
};
```

`up` runs when you migrate forward. `down` runs when you rollback.
Always write both — you will need `down` eventually.

---

## Common column types

| Knex method | PostgreSQL type | Notes |
|---|---|---|
| `t.uuid('id')` | UUID | Use with `defaultTo(knex.raw('gen_random_uuid()'))` |
| `t.string('name', 100)` | VARCHAR(100) | Second arg is max length |
| `t.text('body')` | TEXT | No length limit |
| `t.integer('sort_order')` | INTEGER | |
| `t.decimal('gpa', 3, 2)` | NUMERIC(3,2) | precision, scale |
| `t.boolean('is_active')` | BOOLEAN | |
| `t.date('start_date')` | DATE | Date only, no time |
| `t.timestamp('created_at')` | TIMESTAMP | Date + time |
| `t.jsonb('metadata')` | JSONB | Queryable JSON |

---

## Common constraints

```js
t.string('email').notNullable().unique();          // NOT NULL + UNIQUE
t.integer('sort_order').notNullable().defaultTo(0); // NOT NULL + DEFAULT

// Foreign key with cascade delete
t.uuid('experience_id')
  .notNullable()
  .references('id')
  .inTable('experience')
  .onDelete('CASCADE');
```

---

## Adding a column to an existing table

Don't edit an old migration file — create a new one:

```bash
npx knex migrate:make add_avatar_url_to_profile
```

```js
exports.up = function (knex) {
  return knex.schema.alterTable('profile', (t) => {
    t.string('avatar_url', 255);
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable('profile', (t) => {
    t.dropColumn('avatar_url');
  });
};
```

---

## Running migrations

```bash
# Apply all pending migrations
npx knex migrate:latest

# Rollback the most recent batch
npx knex migrate:rollback

# Rollback ALL migrations (careful in production)
npx knex migrate:rollback --all

# Check migration status
npx knex migrate:status
```

---

## Seeds (separate from migrations)

Seeds populate your database with data. They live in `./seeds/` and are run manually — they don't run automatically with migrations.

```bash
npx knex seed:run
```

Unlike migrations, seeds are not tracked — running them again will re-insert data. Always clear the table at the top of your seed file to avoid duplicates:

```js
exports.seed = async function (knex) {
  await knex('posts').del(); // clear first
  await knex('posts').insert([
    { title: 'Hello World', is_published: true },
  ]);
};
```

---

## Golden rules

1. **Never edit a migration that has already been run** — create a new one instead. Editing old ones breaks the checksum Knex uses to track state.
2. **Always write `down`** — even if you think you'll never rollback, you will.
3. **Order matters for foreign keys** — the referenced table must exist before the referencing table. Keep your timestamps in dependency order.
4. **One change per migration** — keeps rollbacks clean and history readable.
5. **Migrations are code** — commit them to Git alongside your application code.
