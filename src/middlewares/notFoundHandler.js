export function notFoundHandler(req, res, next) {
  throw new Error('Route not found', { cause: 404 });
}
