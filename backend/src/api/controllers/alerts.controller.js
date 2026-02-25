const asyncHandler = require('../../utils/async-handler');
const alertRepository = require('../../repositories/alert.repository');

exports.getAlerts = asyncHandler(async (req, res) => {
  const filters = req.query;
  const result = await alertRepository.findAll(filters);
  res.json(result);
});
