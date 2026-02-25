const express = require('express');
const router = express.Router();

const eventsRoutes = require('./events.routes');
const alertsRoutes = require('./alerts.routes');
const authRoutes = require('./auth.routes');
const usersRoutes = require('./users.routes');
const casesRoutes = require('./cases.routes');

router.use('/events', eventsRoutes);
router.use('/alerts', alertsRoutes);
router.use('/auth', authRoutes);
router.use('/users', usersRoutes);
router.use('/cases', casesRoutes);

module.exports = router;
