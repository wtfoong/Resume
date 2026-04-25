const bcrypt = require('bcryptjs');
const db = require('../src/repositories/db');
require('dotenv').config();

const email = 'wtfoong81@gmail.com';
const password = 'your_password_here'; // change this

async function createAdmin() {
  const hash = await bcrypt.hash(password, 10);
  await db('admin_users').insert({ email, password_hash: hash });
  console.log('Admin user created successfully');
  process.exit(0);
}

createAdmin().catch((err) => {
  console.error(err);
  process.exit(1);
});