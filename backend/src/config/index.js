require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV || 'development',
  ml: {
    url: process.env.ML_SERVICE_URL || (process.env.NODE_ENV === 'docker' ? 'http://ml:5000' : 'http://localhost:5000'),
    enabled: process.env.ML_ENABLED === 'true' || true,
  },
  database: require('./database.config'),
  redis: require('./redis.config'),
};
