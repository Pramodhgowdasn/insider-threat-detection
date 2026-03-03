const Joi = require('joi');

exports.getEventsQuerySchema = Joi.object({
  limit: Joi.number().integer().min(1).max(100).optional(),
  offset: Joi.number().integer().min(0).optional(),
});
exports.createEventSchema = Joi.object({
  event_type: Joi.string().min(3).required(),
  source: Joi.string().min(3).required(),
  user_id: Joi.number().integer().optional(),
  metadata: Joi.object().optional(),
});

