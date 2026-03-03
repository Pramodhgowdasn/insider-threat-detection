require('dotenv').config();
const axios = require('axios');

const API_URL = process.env.VITE_API_URL || 'http://localhost:3000/api';

const eventTypes = [
  'LOGON', 'LOGOFF', 'FILE_ACCESS', 'DATA_EXPORT', 
  'PRIVILEGE_ESCALATION', 'SUDO_ACCESS', 'DELETE_DB', 'LOGIN_FAILURE'
];

const users = [1, 2, 3, 4, 5]; // Assuming these IDs exist from 01_users.js
const functionalUnits = ['IT', 'FINANCE', 'HR', 'SALES', 'R&D'];

const simulateEvent = async () => {
  const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
  const userId = users[Math.floor(Math.random() * users.length)];
  
  const eventData = {
    event_type: eventType,
    source: 'simulation-engine',
    user_id: userId,
    metadata: {
      ip: `192.168.1.${Math.floor(Math.random() * 255)}`,
      file_size: Math.floor(Math.random() * 1024 * 1024 * 500), // Up to 500MB
      destination_ip: Math.random() > 0.7 ? '45.32.11.4' : '10.0.0.15'
    }
  };

  try {
    const response = await axios.post(`${API_URL}/events`, eventData);
    console.log(`[SIMULATOR] Event Created: ${eventType} for User ${userId}`);
    if (response.data.risk?.is_anomaly) {
        console.log(`⚠️  AI ALERT: ${response.data.risk.factors.join(', ')}`);
    }
  } catch (error) {
    if (error.response) {
      console.error(`[SIMULATOR] API Error (${error.response.status}):`, error.response.data?.message || error.response.data);
    } else if (error.request) {
      console.error(`[SIMULATOR] Network Error: No response received from ${API_URL}. Is the backend running?`);
    } else {
      console.error(`[SIMULATOR] Setup Error:`, error.message);
    }
  }
};

const runSimulator = async () => {
  console.log('🚀 Starting Insider Threat AI Simulation...');
  console.log(`Target API: ${API_URL}`);
  
  // Run 10 initial events
  for(let i = 0; i < 10; i++) {
    await simulateEvent();
  }

  // Then run every 5 seconds
  setInterval(simulateEvent, 5000);
};

runSimulator();
