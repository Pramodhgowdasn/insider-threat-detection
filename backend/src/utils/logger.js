const fs = require('fs');
const path = require('path');

const logDir = path.join(__dirname, '../../logs');

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const logFile = path.join(logDir, 'access.log');

exports.log = (message) => {
  const logEntry = `[${new Date().toISOString()}] ${message}\n`;
  fs.appendFileSync(logFile, logEntry);
};
