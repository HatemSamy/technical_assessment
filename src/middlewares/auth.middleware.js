import jwt from 'jsonwebtoken';
import prisma from '../models/prismaClient.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const authenticate = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('Authentication token missing or invalid', { cause: 401 });
  }

  const token = authHeader.split(' ')[1];
  const payload = jwt.verify(token, process.env.JWT_SECRET);

  const user = await prisma.user.findUnique({ where: { id: payload.sub } });
  if (!user) {
    throw new Error('User no longer exists', { cause: 401 });
  }

  req.user = {
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
  };

  next();
});

export function authorizeRoles(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      throw new Error('Insufficient permissions', { cause: 403 });
    }
    next();
  };
}
