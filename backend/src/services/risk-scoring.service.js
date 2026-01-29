exports.evaluateRisk = (event) => {
  // FAST MODE RULES (simple & effective)
  if (event.event_type === 'LOGIN' && event.metadata?.user === 'admin') {
    return {
      severity: 'HIGH',
      reason: 'Admin login detected',
    };
  }

  if (event.event_type === 'FILE_DELETE') {
    return {
      severity: 'MEDIUM',
      reason: 'File deletion activity',
    };
  }

  return null; // No alert
};
