const express = require('express');
const apiRoutes = require('./api/routes');
const errorHandler = require('./api/middlewares/errorHandler.middleware');

const app = express();

// global middleware
app.use(express.json());

// health check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    service: 'insider-threat-backend',
  });
});

// API routes
app.use('/api', apiRoutes);

// global error handler (must be last)
app.use(errorHandler);

module.exports = app;
