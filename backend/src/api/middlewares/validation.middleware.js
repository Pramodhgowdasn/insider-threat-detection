const AppError = require('../../errors/AppError');

module.exports = (schema, property = 'body') => {
  return (req, res, next) => {
    const dataToValidate = req[property];

    const { error, value } = schema.validate(dataToValidate, {
      abortEarly: false,
      allowUnknown: true,
    });

    if (error) {
      const message = error.details.map(d => d.message).join(', ');
      return next(new AppError(message, 400));
    }

    // overwrite with validated value (sanitized)
    req[property] = value;

    next();
  };
};
