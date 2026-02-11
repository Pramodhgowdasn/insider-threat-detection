const AppError = require('../errors/AppError');

function validate(schema) {
  return (req, res, next) => {
    try {
      schema.parse(req.body);
      next();
    } catch (err) {
      next(new AppError(err.message, 400));
    }
  };
}

module.exports = validate;
