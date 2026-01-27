const express = require('express');

const app = express();

// global middleware
app.use(express.json());

// health check route
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    service: 'insider-threat-backend',
  });
});

module.exports = app;
