const Joi = require('joi');

exports.getEventsQuerySchema = Joi.object({
  limit: Joi.number().integer().min(1).max(100).optional(),
  offset: Joi.number().integer().min(0).optional(),
});
