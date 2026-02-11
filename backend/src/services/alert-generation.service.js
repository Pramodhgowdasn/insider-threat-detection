const db = require('../database/db');

async function generateAlerts(event, riskResult) {
  if (!event) return;

  // Rule 1: High Risk Score from Risk Engine
  if (riskResult && riskResult.severity === 'HIGH') {
    await db('alerts').insert({
      user_id: event.user_id, // Ensure user_id exists in event
      type: 'HIGH_RISK_ACTIVITY',
      severity: 'HIGH',
      message: riskResult.reason || 'High risk activity detected'
    });
    return; // Priority alert
  }

  // Rule 2: Privilege escalation
  if (event.event_type === 'privilege_escalation') {
    await db('alerts').insert({
      user_id: event.user_id,
      type: 'PRIVILEGE_ESCALATION',
      severity: 'HIGH',
      message: 'Privilege escalation detected'
    });
  }

  // Rule 3: Sensitive file access
  if (
    event.event_type === 'file_access' &&
    event.metadata &&
    typeof event.metadata.file === 'string' &&
    event.metadata.file.toLowerCase().includes('salary')
  ) {
    await db('alerts').insert({
      user_id: event.user_id,
      type: 'SENSITIVE_FILE_ACCESS',
      severity: 'MEDIUM',
      message: `Sensitive file accessed: ${event.metadata.file}`
    });
  }
}

module.exports = { generateAlerts };
