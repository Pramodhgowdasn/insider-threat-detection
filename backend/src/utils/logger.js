const fs = require('fs');
const path = require('path');

const logDir = path.join(__dirname, '../../logs');

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const logFile = path.join(logDir, 'access.log');

const writeLog = (level, message) => {
  const logEntry = `[${new Date().toISOString()}] [${level.toUpperCase()}] ${message}\n`;
  console.log(logEntry.trim()); // Also log to console for development visibility
  try {
    fs.appendFileSync(logFile, logEntry);
  } catch (err) {
    console.error('Failed to write to log file:', err.message);
  }
};

exports.log = (message) => writeLog('info', message);
exports.info = (message) => writeLog('info', message);
exports.error = (message, detail = '') => writeLog('error', `${message} ${detail}`);
exports.warn = (message) => writeLog('warn', message);
exports.debug = (message) => writeLog('debug', message);
