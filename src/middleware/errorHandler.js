const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Error interno del servidor";

  console.error(`[ERROR] ${new Date().toISOString()} - ${statusCode} - ${message}`);
  if (err.stack) {
    console.log(err.stack)
  }

  res.status(statusCode).json({
    success: false,
    error: message,
    statusCode,
    message,
  });
};

module.exports = errorHandler;
