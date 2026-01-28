const express = require('express');
const router = express.Router();

const { getEvents } = require('../controllers/events.controller');
const validate = require('../middlewares/validation.middleware');
const { getEventsQuerySchema } = require('../validators/event.validator');

router.get('/', validate(getEventsQuerySchema, 'query'), getEvents);

module.exports = router;
