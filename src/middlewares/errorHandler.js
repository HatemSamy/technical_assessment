export const globalErrorHandling = (err, req, res, next) => {
  if (err) {
    if (process.env.MOOD === 'DEV') {
      res.status(err.cause || 500).json({
        message: 'catch error',
        errMas: err.message,
        stack: err.stack
      });
    } else {
      res.status(err.cause || 500).json({
        message: 'catch error',
        errMas: err.message
      });
    }
  }
};
