class EventRepository {
  async findAll({ limit, offset }) {
    // Placeholder for DB logic
    // Later: SELECT * FROM events LIMIT ... OFFSET ...

    return [];
  }
}

module.exports = new EventRepository();
