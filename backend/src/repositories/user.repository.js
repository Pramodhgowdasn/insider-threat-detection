const db = require('../database/db');


class UserRepository {
  async create(user) {
    const [id] = await db('users').insert(user);
    return db('users').where({ id }).first();
  }

  async findByUsername(username) {
    return db('users')
      .where({ username })
      .first();
  }

  async findAll() {
    return db('users').select('*');
  }
}

module.exports = new UserRepository();
