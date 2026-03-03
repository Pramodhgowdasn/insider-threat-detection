const db = require('../database/db');
const logger = require('../utils/logger');

/**
 * Behavioral Analysis Service
 * Implements advanced heuristics and sequential analysis aligned with CERT r4.2
 */

exports.analyzeUserBehavior = async (userId) => {
  try {
    // 1. Fetch recent events for the user
    const recentEvents = await db('events')
      .where({ user_id: userId })
      .orderBy('created_at', 'desc')
      .limit(100);

    if (recentEvents.length < 5) {
      return { status: 'INITIALIZING', message: 'Insufficient data for behavioral profiling' };
    }

    // 2. Sequential Analysis (Logon/Logoff patterns)
    const logonEvents = recentEvents.filter(e => ['LOGON', 'LOGIN'].includes(e.event_type.toUpperCase()));
    const logoffEvents = recentEvents.filter(e => ['LOGOFF', 'LOGOUT'].includes(e.event_type.toUpperCase()));
    
    // 3. Temporal Analysis (Unusual hours)
    const afterHoursCount = recentEvents.filter(e => {
      const hour = new Date(e.created_at).getHours();
      return hour < 7 || hour > 19;
    }).length;

    // 4. Intensity Analysis (Frequency of events)
    const timeSpan = (new Date(recentEvents[0].created_at) - new Date(recentEvents[recentEvents.length-1].created_at)) / (1000 * 60 * 60); // hours
    const eventFrequency = recentEvents.length / (timeSpan || 1);

    // 5. Synthesis
    let riskLevel = 'LOW';
    const indicators = [];

    if (afterHoursCount > recentEvents.length * 0.3) {
      riskLevel = 'MEDIUM';
      indicators.push('High volume of after-hours activity');
    }

    if (eventFrequency > 50) {
      riskLevel = 'HIGH';
      indicators.push('Extreme event frequency detected (potential automated script)');
    }

    if (logonEvents.length > logoffEvents.length + 3) {
      riskLevel = 'MEDIUM';
      indicators.push('Unbalanced Logon/Logoff sequence detected');
    }

    return {
      user_id: userId,
      risk_level: riskLevel,
      behavioral_indicators: indicators,
      metrics: {
        event_count: recentEvents.length,
        after_hours_ratio: (afterHoursCount / recentEvents.length).toFixed(2),
        events_per_hour: eventFrequency.toFixed(2)
      },
      last_updated: new Date()
    };
  } catch (error) {
    logger.error('Behavioral Analysis Error:', error.message);
    throw error;
  }
};
