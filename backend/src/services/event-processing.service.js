const eventRepository = require('../repositories/event.repository');

exports.getEvents = async ({ limit, offset }) => {
  const events = await eventRepository.findAll({
    limit,
    offset,
  });

  return {
    message: 'Events fetched successfully',
    data: events,
    meta: {
      limit: limit || null,
      offset: offset || null,
    },
  };
};
