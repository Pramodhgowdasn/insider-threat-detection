const Joi = require('joi');

exports.getAlertsQuerySchema = Joi.object({
  severity: Joi.string().valid('LOW', 'MEDIUM', 'HIGH', 'CRITICAL').optional(),
  type: Joi.string().optional(),
  user_id: Joi.number().integer().optional(),
  limit: Joi.number().integer().min(1).max(100).default(50),
  offset: Joi.number().integer().min(0).default(0),
});
