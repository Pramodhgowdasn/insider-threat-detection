const bcrypt = require('bcrypt');
const db = require('../database/db');
const { generateToken } = require('../utils/jwt'); // ✅ NOW EXISTS

async function login(username, password) {
  const user = await db('users').where({ username }).first();

  if (!user || !user.password_hash) {
    throw new Error('Invalid credentials');
  }

  const match = await bcrypt.compare(password, user.password_hash);
  if (!match) {
    throw new Error('Invalid credentials');
  }

  return {
    token: generateToken(user),
    user: {
      id: user.id,
      username: user.username,
      role: user.role,
    },
  };
}

module.exports = { login };
