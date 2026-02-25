from flask import Flask, request, jsonify
import random
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)

@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "healthy", "service": "ml-engine"})

@app.route('/predict', methods=['POST'])
def predict():
    """
    Placeholder endpoint for risk prediction.
    Expected input: JSON with event features.
    Returns: JSON with risk_score.
    """
    try:
        data = request.json
        logger.info(f"Received prediction request: {data}")
        
        # Simulated behavioral analysis
        risk_score = 15.0 # Baseline risk
        
        # Rule 1: Time-based risk (After hours)
        hour = data.get('hour', 12)
        if hour < 7 or hour > 20:
            risk_score += 35.0
            
        # Rule 2: Event type sensitivity
        event_type = data.get('type', 'generic')
        risky_events = ['DELETE_DB', 'EXPORT_ALL', 'SUDO_ACCESS', 'DATA_EXFIL']
        if event_type in risky_events:
            risk_score += 40.0
            
        # Rule 3: Administrative user risk
        user_id = str(data.get('user', '')).lower()
        if 'admin' in user_id or 'root' in user_id:
            risk_score += 10.0
            
        # Final capping and jitter
        risk_score = min(100.0, risk_score + random.uniform(-5, 5))
        risk_score = max(0.0, risk_score)
        
        return jsonify({
            "risk_score": round(risk_score, 2),
            "confidence": 0.88,
            "model_version": "v0.2.0-baseline"
        })
    except Exception as e:
        logger.error(f"Prediction error: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    logger.info("Starting ML Service on port 5000...")
    app.run(host='0.0.0.0', port=5000)
