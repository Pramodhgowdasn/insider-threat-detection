const db = require('../database/db');


class AlertRepository {
  async create(alert) {
    const [created] = await db('alerts')
      .insert(alert)
      .returning('*');

    return created;
  }

  async findAll(filters = {}) {
    const { severity, type, user_id, limit = 50, offset = 0 } = filters;
    
    let query = db('alerts')
      .select('alerts.*', 'users.username as user_name')
      .leftJoin('users', 'alerts.user_id', 'users.id');

    if (severity) {
      query = query.where('alerts.severity', severity);
    }

    if (type) {
      query = query.where('alerts.type', type);
    }

    if (user_id) {
      query = query.where('alerts.user_id', user_id);
    }

    const alerts = await query
      .orderBy('alerts.created_at', 'desc')
      .limit(limit)
      .offset(offset);

    const [{ count }] = await db('alerts').count('id as count');

    return {
      data: alerts,
      pagination: {
        total: parseInt(count, 10),
        limit: parseInt(limit, 10),
        offset: parseInt(offset, 10)
      }
    };
  }
}

module.exports = new AlertRepository();
