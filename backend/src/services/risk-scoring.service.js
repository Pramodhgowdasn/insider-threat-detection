/**
 * Rule-based Risk Scoring Service
 * Provides baseline heuristics for security events
 */

exports.evaluateRisk = (event) => {
  const eventType = String(event.event_type).toUpperCase();
  
  // Severity to Score mapping
  const severityMap = {
    'LOW': 20,
    'MEDIUM': 50,
    'HIGH': 80,
    'CRITICAL': 100
  };

  // Default return structure
  const result = {
    score: 0,
    severity: 'LOW',
    factors: []
  };

  // Rule 1: Admin sensitive activity
  if (['LOGIN', 'LOGON'].includes(eventType) && event.metadata?.user === 'admin') {
    result.severity = 'HIGH';
    result.factors.push('Admin login detected');
  }

  // Rule 2: File deletion
  if (['FILE_DELETE', 'DELETE_DB'].includes(eventType)) {
    result.severity = 'MEDIUM';
    result.factors.push('Destructive activity detected');
  }

  // Rule 3: Sequential Logon/Logoff Check (Baseline)
  if (['LOGOFF', 'LOGOUT'].includes(eventType) && event.metadata?.duration < 1) {
    result.severity = 'MEDIUM';
    result.factors.push('Rapid session termination');
  }

  // Apply score based on final severity
  result.score = severityMap[result.severity] || 0;

  return result;
};
