const eventProcessingService = require('../../services/event-processing.service');

exports.getEvents = async (req, res, next) => {
  try {
    const { limit, offset } = req.query;

    const result = await eventProcessingService.getEvents({
      limit,
      offset,
    });

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
