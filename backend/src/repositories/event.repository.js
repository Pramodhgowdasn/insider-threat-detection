const db = require('../database/db');


class EventRepository {
  async findAll({ limit, offset }) {
    return db('events')
      .select('*')
      .limit(limit || 50)
      .offset(offset || 0)
      .orderBy('created_at', 'desc');
  }

  async create(event) {
    const [id] = await db('events').insert(event);
    return db('events').where({ id }).first();
  }
}

module.exports = new EventRepository();
