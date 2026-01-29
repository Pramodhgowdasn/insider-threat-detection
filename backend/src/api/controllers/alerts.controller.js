const asyncHandler = require('../../utils/async-handler');
const alertRepository = require('../../repositories/alert.repository');

exports.getAlerts = asyncHandler(async (req, res) => {
  const alerts = await alertRepository.findAll();
  res.json(alerts);
});
