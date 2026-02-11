const express = require('express');
const db = require('../../database/db');


const router = express.Router();

const { getEvents, createEvent } = require('../controllers/events.controller');
const validate = require('../../middleware/validation.middleware');
const { getEventsQuerySchema, createEventSchema } = require('../validators/event.validator');

// GET /api/events
router.get('/', validate(getEventsQuerySchema, 'query'), getEvents);

// POST /api/events
router.post('/', validate(createEventSchema), createEvent);

module.exports = router;
