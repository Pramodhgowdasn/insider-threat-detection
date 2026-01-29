const asyncHandler = require('../../utils/async-handler');
const eventProcessingService = require('../../services/event-processing.service');

exports.getEvents = asyncHandler(async (req, res) => {
  const { limit, offset } = req.query;

  const result = await eventProcessingService.getEvents({
    limit,
    offset,
  });

  res.status(200).json(result);
});
exports.createEvent = asyncHandler(async (req, res) => {
  const { event_type, source, metadata } = req.body;

  const event = await eventProcessingService.createEvent({
    event_type,
    source,
    metadata,
  });

  res.status(201).json(event);
});
