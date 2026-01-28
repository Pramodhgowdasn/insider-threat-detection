const express = require('express');
const router = express.Router();

const { getEvents } = require('../controllers/events.controller');

router.get('/', getEvents);

module.exports = router;
