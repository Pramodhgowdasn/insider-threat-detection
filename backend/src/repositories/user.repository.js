const db = require('../database/db');


class UserRepository {
  async create(user) {
    const [created] = await db('users')
      .insert(user)
      .returning('*');

    return created;
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
