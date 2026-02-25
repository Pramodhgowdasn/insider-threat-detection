const db = require('../database/db');

class CaseRepository {
  async create(caseData) {
    const [created] = await db('cases')
      .insert(caseData)
      .returning('*');
    return created;
  }

  async findAll(filters = {}) {
    const { status, priority, assignee_id, limit = 50, offset = 0 } = filters;
    
    let query = db('cases')
      .select('cases.*', 'assignee.username as assignee_name', 'creator.username as creator_name')
      .leftJoin('users as assignee', 'cases.assignee_id', 'assignee.id')
      .leftJoin('users as creator', 'cases.creator_id', 'creator.id');

    if (status) query = query.where('cases.status', status);
    if (priority) query = query.where('cases.priority', priority);
    if (assignee_id) query = query.where('cases.assignee_id', assignee_id);

    const data = await query
      .orderBy('cases.created_at', 'desc')
      .limit(limit)
      .offset(offset);

    const [{ count }] = await db('cases').count('id as count');

    return {
      data,
      pagination: {
        total: parseInt(count, 10),
        limit: parseInt(limit, 10),
        offset: parseInt(offset, 10)
      }
    };
  }

  async findById(id) {
    return db('cases')
      .select('cases.*', 'assignee.username as assignee_name', 'creator.username as creator_name')
      .leftJoin('users as assignee', 'cases.assignee_id', 'assignee.id')
      .leftJoin('users as creator', 'cases.creator_id', 'creator.id')
      .where('cases.id', id)
      .first();
  }

  async update(id, updateData) {
    const [updated] = await db('cases')
      .where({ id })
      .update({ ...updateData, updated_at: db.fn.now() })
      .returning('*');
    return updated;
  }
}

module.exports = new CaseRepository();
