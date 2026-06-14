const logger = require('../utils/logger');
const { errorResponse } = require('../utils/response');

/**
 * Global error handler middleware
 */
const errorHandler = (err, req, res, next) => {
  logger.error('Error occurred', {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
  });

  // Sequelize validation error
  if (err.name === 'SequelizeValidationError') {
    const errors = err.errors.map((e) => ({
      field: e.path,
      message: e.message,
    }));

    return res.status(400).json(
      errorResponse('Validation error', errors, 400)
    );
  }

  // Sequelize unique constraint error
  if (err.name === 'SequelizeUniqueConstraintError') {
    const errors = err.errors.map((e) => ({
      field: e.path,
      message: `${e.path} must be unique`,
    }));

    return res.status(409).json(
      errorResponse('Constraint error', errors, 409)
    );
  }

  // Sequelize database error
  if (err.name === 'SequelizeDatabaseError') {
    return res.status(500).json(
      errorResponse('Database error', null, 500)
    );
  }

  // Custom error
  if (err.statusCode) {
    return res.status(err.statusCode).json(
      errorResponse(err.message, err.errors, err.statusCode)
    );
  }

  // Generic error
  const statusCode = err.status || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json(
    errorResponse(message, null, statusCode)
  );
};

module.exports = errorHandler;
