const express = require('express');

const app = express();

// basic middleware
app.use(express.json());

// simple health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', service: 'insider-threat-backend' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
