const db = require('../database/db');
const { generateAlerts } = require('./alert-generation.service');
const { evaluateRisk } = require('./risk-scoring.service');
const { detectAnomaly } = require('./ml-inference.service');

async function createEvent(eventData) {
  // Insert event - SQLite-compatible way (returning works on PG but not SQLite)
  const [id] = await db('events').insert(eventData);
  
  // Fetch the full event record after insertion
  const event = await db('events').where({ id }).first();

  // 1. Evaluate Risk (Rule-based)
  const ruleRisk = evaluateRisk(event) || { score: 0, factors: [] };

  // 2. ML Anomaly Detection
  const anomalyResult = await detectAnomaly(event) || { score: 0, factors: [], is_anomaly: false };

  // Combine risk scores (simplified logic)
  const combinedRisk = {
    score: Math.max(ruleRisk.score || 0, (anomalyResult.score || 0) * 100),
    factors: [...(ruleRisk.factors || []), ...(anomalyResult.factors || [])],
    is_anomaly: !!anomalyResult.is_anomaly
  };

  // 3. Generate Alerts (passing combined risk result)
  await generateAlerts(event, combinedRisk);

  return { ...event, risk: combinedRisk, ml_analysis: anomalyResult };
}

async function getEvents({ limit = 10, offset = 0 }) {
  const events = await db('events')
    .select('*')
    .limit(limit)
    .offset(offset)
    .orderBy('created_at', 'desc');

  const [{ count }] = await db('events').count();

  return {
    data: events,
    pagination: {
      total: parseInt(count, 10),
      limit: parseInt(limit, 10),
      offset: parseInt(offset, 10)
    }
  };
}

module.exports = { createEvent, getEvents };
