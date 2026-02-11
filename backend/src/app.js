const express = require('express');
const cors = require('cors');
const apiRoutes = require('./api/routes');
const errorHandler = require('./middleware/errorHandler.middleware');
const requestLogger = require('./middleware/logger.middleware');

const app = express();

// global middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json());
app.use(requestLogger);

// health check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    service: 'insider-threat-backend',
  });
});

// API routes
app.use('/api', apiRoutes);

// global error handler
app.use(errorHandler);

module.exports = app;

