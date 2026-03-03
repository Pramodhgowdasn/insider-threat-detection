const db = require('../database/db');
const logger = require('../utils/logger');

async function generateAlerts(event, riskResult) {
  if (!event) return;

  try {
    // 1. Research-Based Threshold (AI Anomaly)
    // If AI (riskResult) says it's an anomaly or score > 70
    if (riskResult && (riskResult.is_anomaly || riskResult.score > 0.7)) {
      const severity = riskResult.score > 0.9 ? 'CRITICAL' : 'HIGH';
      await db('alerts').insert({
        user_id: event.user_id,
        type: 'AI_BEHAVIORAL_ANOMALY',
        severity: severity,
        message: `AI detected ${severity.toLowerCase()} risk behavior: ${riskResult.factors?.join(', ') || 'Unusual pattern'}`
      });
      logger.info(`[AI ALERT] Generated ${severity} alert for user ${event.user_id}`);
    }

    // 2. Privilege escalation (CERT r4.2 pattern)
    if (['PRIVILEGE_ESCALATION', 'SUDO_ACCESS'].includes(String(event.event_type).toUpperCase())) {
      await db('alerts').insert({
        user_id: event.user_id,
        type: 'PRIVILEGE_ESCALATION',
        severity: 'CRITICAL',
        message: 'Potential privilege escalation detected (High Impact)'
      });
    }

    // 3. Data Exfiltration (CERT r4.2 pattern)
    if (['DATA_EXPORT', 'EXPORT_ALL', 'DATA_EXFIL'].includes(String(event.event_type).toUpperCase())) {
      await db('alerts').insert({
        user_id: event.user_id,
        type: 'DATA_EXFILTRATION',
        severity: 'HIGH',
        message: 'Suspicious data export activity identified'
      });
    }
  } catch (error) {
    logger.error('Error generating alerts:', error.message);
  }
}

module.exports = { generateAlerts };
