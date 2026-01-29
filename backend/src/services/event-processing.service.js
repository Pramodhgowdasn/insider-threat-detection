const eventRepository = require('../repositories/event.repository');
const alertGenerationService = require('./alert-generation.service');

exports.getEvents = async ({ limit, offset }) => {
  const events = await eventRepository.findAll({ limit, offset });

  return {
    message: 'Events fetched successfully',
    data: events,
    meta: {
      limit: limit || null,
      offset: offset || null,
    },
  };
};

exports.createEvent = async ({ event_type, source, metadata }) => {
  const event = await eventRepository.create({
    event_type,
    source,
    metadata,
  });

  // 🔥 FAST MODE ALERT PIPELINE
  await alertGenerationService.processEventForAlert(event);

  return event;
};
