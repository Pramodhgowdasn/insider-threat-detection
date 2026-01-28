const logger = require('../../utils/logger');

module.exports = (req, res, next) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;

    const logMessage = `${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms`;
    logger.log(logMessage);
  });

  next();
};
