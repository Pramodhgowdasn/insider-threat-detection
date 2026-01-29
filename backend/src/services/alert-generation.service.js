const alertRepository = require('../repositories/alert.repository');
const riskScoringService = require('./risk-scoring.service');

exports.processEventForAlert = async (event) => {
  const risk = riskScoringService.evaluateRisk(event);

  if (!risk) return null;

  const alert = await alertRepository.create({
    event_id: event.id,
    severity: risk.severity,
    reason: risk.reason,
  });

  return alert;
};
