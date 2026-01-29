const db = require('../database/connection');

class AlertRepository {
  async create(alert) {
    const [created] = await db('alerts')
      .insert(alert)
      .returning('*');

    return created;
  }

  async findAll() {
    return db('alerts')
      .select('*')
      .orderBy('created_at', 'desc');
  }
}

module.exports = new AlertRepository();
