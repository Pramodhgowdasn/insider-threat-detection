const axios = require('axios');
const config = require('../config');
const logger = require('../utils/logger');

/**
 * Machine Learning Inference Service
 * Connects to the external ML engine for anomaly detection
 */

exports.detectAnomaly = async (event) => {
  try {
    // 1. Feature Extraction
    const features = extractFeatures(event);
    
    // 2. Inference (Call external ML service)
    let prediction;
    if (config.ml.enabled) {
      const response = await axios.post(`${config.ml.url}/predict`, features);
      prediction = response.data;
    } else {
      // Fallback to local heuristic if ML service is disabled
      prediction = mockInference(features);
    }
    
    // 3. Classification
    const isAnomaly = prediction.risk_score > 75;

    return {
      is_anomaly: isAnomaly,
      score: prediction.risk_score / 100, // Normalize to 0-1
      confidence: prediction.confidence || 0.85,
      factors: identifyRiskFactors(features, isAnomaly),
      model_version: prediction.model_version || 'local-fallback'
    };
  } catch (error) {
    logger.error('ML Inference Error:', error.message);
    // Fallback logic if service is down
    const fallback = mockInference(extractFeatures(event));
    return {
      is_anomaly: fallback.risk_score > 75,
      score: fallback.risk_score / 100,
      confidence: 0.5, // Low confidence on fallback
      factors: ['ML Service Unreachable', ...identifyRiskFactors(extractFeatures(event), false)],
      model_version: 'fallback'
    };
  }
};

function extractFeatures(event) {
  return {
    hour: new Date().getHours(),
    type: event.event_type,
    user: event.user_id || 'unknown',
    metadata: event.metadata || {}
  };
}

function mockInference(features) {
  let score = 15.0;
  const hour = features.hour;
  const eventType = String(features.type).toUpperCase();
  const metadata = features.metadata || {};

  // 1. Temporal Analysis
  if (hour < 6 || hour > 21) {
    score += 35.0; // Significant risk for late night/early morning
  } else if (hour > 18) {
    score += 10.0; // Moderate risk for after-hours
  }

  // 2. Behavioral Pattern Matching
  const criticalEvents = ['DELETE_DB', 'EXPORT_ALL', 'PRIVILEGE_ESCALATION', 'UNAUTHORIZED_ACCESS'];
  const highRiskEvents = ['FILE_DELETION', 'DATA_EXPORT', 'LOGIN_FAILURE', 'CONFIG_CHANGE'];
  
  if (criticalEvents.includes(eventType)) {
    score += 65.0;
  } else if (highRiskEvents.includes(eventType)) {
    score += 30.0;
  }

  // 3. Metadata Analysis (Simulating deep packet/content inspection)
  if (metadata.file_size > 1024 * 1024 * 100) { // > 100MB
    score += 25.0;
  }
  if (metadata.destination_ip && !metadata.destination_ip.startsWith('10.')) {
    score += 20.0; // External IP destination
  }
  if (metadata.failed_attempts > 3) {
    score += 40.0;
  }

  // 4. Sequence Analysis Simulation (simplified)
  // In a real AI, this would be an LSTM or Transformer looking at event chains
  if (eventType === 'LOGIN_FAILURE' && score > 50) {
    score += 20.0; // Potential Brute Force
  }

  return {
    risk_score: Math.min(score, 100.0),
    confidence: score > 80 ? 0.92 : 0.75,
    model_version: 'behavioral-engine-v2'
  };
}

function identifyRiskFactors(features, isAnomaly) {
  const factors = [];
  const hour = features.hour;
  const eventType = String(features.type).toUpperCase();
  const metadata = features.metadata || {};

  if (hour < 6 || hour > 21) factors.push('Critical After-Hours Activity');
  if (hour >= 18 && hour <= 21) factors.push('Post-Work Hours Access');
  
  if (['DATA_EXPORT', 'EXPORT_ALL'].includes(eventType)) factors.push('Data Exfiltration Pattern');
  if (['DELETE_DB', 'FILE_DELETION'].includes(eventType)) factors.push('Destructive Behavior Detected');
  
  if (metadata.file_size > 1024 * 1024 * 100) factors.push('Large Data Transfer');
  if (metadata.destination_ip && !metadata.destination_ip.startsWith('10.')) factors.push('External Data Transmission');
  
  if (isAnomaly) factors.push('Behavioral Baseline Deviation');
  
  return factors;
}
