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
