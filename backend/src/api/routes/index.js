const express = require('express');
const router = express.Router();

router.use('/events', require('./events.routes'));
router.use('/alerts', require('./alerts.routes'));

module.exports = router;
