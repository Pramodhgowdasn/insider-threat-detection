exports.getEvents = async ({ limit, offset }) => {
  // Business logic layer
  // Later: DB fetch, filters, ML scoring, etc.

  return {
    message: 'Events fetched successfully',
    data: [],
    meta: {
      limit: limit || null,
      offset: offset || null,
    },
  };
};
