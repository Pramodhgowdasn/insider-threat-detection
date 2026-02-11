/**
 * Machine Learning Inference Service
 * Simulates an Isolation Forest model for anomaly detection
 */

// Simulates a trained model's decision boundary
const BASELINE_BEHAVIOR = {
  login_times: [9, 18], // 9 AM to 6 PM
  common_locations: ['US', 'UK', 'IN'],
  file_access_rate: 50 // operations per hour
};

exports.detectAnomaly = async (event) => {
  // 1. Feature Extraction
  const features = extractFeatures(event);
  
  // 2. Inference (Mocking a model prediction)
  const anomalyScore = calculateAnomalyScore(features);
  
  // 3. Classification
  const isAnomaly = anomalyScore > 0.75;

  return {
    is_anomaly: isAnomaly,
    score: anomalyScore, // 0.0 to 1.0
    confidence: 0.85 + (Math.random() * 0.1), // Mock confidence
    factors: identifyRiskFactors(features, isAnomaly)
  };
};

function extractFeatures(event) {
  return {
    hour: new Date().getHours(), // Simplified: uses current server time
    type: event.event_type,
    user: event.user || 'unknown'
  };
}

function calculateAnomalyScore(features) {
  let score = 0.1; // Base risk

  // Factor 1: Time of day (After hours is risky)
  if (features.hour < 7 || features.hour > 20) {
    score += 0.4;
  }

  // Factor 2: Event Type Sensitivity
  const riskyEvents = ['DELETE_DB', 'EXPORT_ALL', 'SUDO_ACCESS'];
  if (riskyEvents.includes(features.type)) {
    score += 0.5;
  }

  // Normalize to 0-1
  return Math.min(score, 0.99);
}

function identifyRiskFactors(features, isAnomaly) {
  const factors = [];
  if (features.hour < 7 || features.hour > 20) factors.push('Unusual Time of Activity');
  if (isAnomaly) factors.push('Deviation from User Baseline');
  return factors;
}
