const express = require('express');
const router = express.Router();
const db = require('../../database/db');

const authenticate = require('../../middleware/auth.middleware');
const authorizeRoles = require('../../middleware/role.middleware');

const alertsController = require('../controllers/alerts.controller');
const validate = require('../../middleware/validation.middleware');
const { getAlertsQuerySchema } = require('../validators/alert.validator');

router.get(
  '/',
  authenticate,
  validate(getAlertsQuerySchema, 'query'),
  alertsController.getAlerts
);

module.exports = router;
