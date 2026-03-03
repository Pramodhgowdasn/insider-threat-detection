const AppError = require('../errors/AppError');

/**
 * Validation middleware for Joi schemas
 * @param {Object} schema - Joi schema object
 * @param {string} source - Request source to validate ('body', 'query', 'params')
 */
function validate(schema, source = 'body') {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[source], {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const errorMessage = error.details
        .map((detail) => detail.message)
        .join(', ');
      return next(new AppError(errorMessage, 400));
    }

    // Replace request data with validated value (important for type casting and stripping unknown)
    req[source] = value;
    next();
  };
}

module.exports = validate;
