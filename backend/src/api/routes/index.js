const express = require('express');
const router = express.Router();

const eventsRoutes = require('./events.routes');
const alertsRoutes = require('./alerts.routes');
const authRoutes = require('./auth.routes');   // 👈 THIS LINE

router.use('/events', eventsRoutes);
router.use('/alerts', alertsRoutes);
router.use('/auth', authRoutes);               // 👈 THIS LINE

module.exports = router;
