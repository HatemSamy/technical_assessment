export function createApiError(status, message, errors = null, isOperational = true) {
  const error = new Error(message);
  error.status = status;
  error.errors = errors;
  error.isOperational = isOperational;
  error.name = 'ApiError';
  Error.captureStackTrace(error, createApiError);
  return error;
}

export const ApiError = {
  badRequest: (message = 'Bad Request', errors = null) =>
    createApiError(400, message, errors),

  unauthorized: (message = 'Unauthorized') =>
    createApiError(401, message),

  forbidden: (message = 'Forbidden') =>
    createApiError(403, message),

  notFound: (message = 'Resource not found') =>
    createApiError(404, message),

  conflict: (message = 'Conflict') =>
    createApiError(409, message),

  unprocessableEntity: (message = 'Unprocessable Entity', errors = null) =>
    createApiError(422, message, errors),

  internal: (message = 'Internal Server Error') =>
    createApiError(500, message, null, false),

  custom: (status, message, errors = null, isOperational = true) =>
    createApiError(status, message, errors, isOperational),
};
