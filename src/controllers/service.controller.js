import prisma from '../models/prismaClient.js';
import { paginate } from '../utils/pagination.js';
import { asyncHandler } from '../utils/asyncHandler.js';


export const createService = asyncHandler(async (req, res) => {
  const { name, description, status } = req.body;

  const service = await prisma.service.create({
    data: {
      name,
      description,
      status,
      createdById: req.user.id,
    },
    include: {
      createdBy: {
        select: {
          id: true,
          username: true,
        },
      },
    },
  });

  return res.status(201).json({
    success: true,
    data: service,
  });
});


export const getServices = asyncHandler(async (req, res) => {
  const { page, limit, status } = req.query;

  const where = {};
  if (status) {
    where.status = status;
  }

  const { page: pageNumber, limit: limitNumber, skip } = paginate(page, limit);

  const [items, total] = await Promise.all([
    prisma.service.findMany({
      where,
      skip,
      take: limitNumber,
      orderBy: { createdAt: 'desc' },
      include: {
        createdBy: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    }),
    prisma.service.count({ where }),
  ]);

  return res.status(200).json({
    success: true,
    data: items,
    pagination: {
      page: pageNumber,
      limit: limitNumber,
      total,
      totalPages: Math.ceil(total / limitNumber) || 1,
    },
  });
});

