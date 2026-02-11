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
        
        # TODO: Load actual model and perform inference
        # For now, return a random risk score to simulate behavior
        
        # Simple heuristic: if 'admin' is in data, slightly higher risk
        base_risk = 10.0
        if data and 'user' in data and 'admin' in data['user']:
            base_risk += 40.0
            
        risk_score = min(100.0, base_risk + random.uniform(0, 40))
        
        return jsonify({
            "risk_score": risk_score,
            "confidence": 0.85,
            "model_version": "v0.1.0-alpha"
        })
    except Exception as e:
        logger.error(f"Prediction error: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    logger.info("Starting ML Service on port 5000...")
    app.run(host='0.0.0.0', port=5000)
