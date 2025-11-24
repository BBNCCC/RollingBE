const { Prisma } = require('@prisma/client');

const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Prisma errors
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case 'P2002':
        return res.status(409).json({
          success: false,
          message: 'A record with this data already exists',
          error: process.env.NODE_ENV === 'development' ? err.message : undefined,
        });
      case 'P2025':
        return res.status(404).json({
          success: false,
          message: 'Record not found',
          error: process.env.NODE_ENV === 'development' ? err.message : undefined,
        });
      default:
        return res.status(400).json({
          success: false,
          message: 'Database error occurred',
          error: process.env.NODE_ENV === 'development' ? err.message : undefined,
        });
    }
  }

  if (err instanceof Prisma.PrismaClientValidationError) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
  }

  // Default error
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};

module.exports = errorHandler;
