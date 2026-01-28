const express = require('express');
const apiRoutes = require('./api/routes');

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

module.exports = app;
