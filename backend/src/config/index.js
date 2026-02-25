require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV || 'development',
  ml: {
    url: process.env.ML_SERVICE_URL || 'http://ml:5000',
    enabled: process.env.ML_ENABLED === 'true',
  },
  database: require('./database.config'),
  redis: require('./redis.config'),
};
