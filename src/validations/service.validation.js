import Joi from 'joi';

export const createServiceValidation = {
  body: Joi.object({
    name: Joi.string().min(2).max(100).required(),
    description: Joi.string().max(500).allow('', null),
    status: Joi.string().valid('ACTIVE', 'INACTIVE').default('ACTIVE'),
  }),
};

export const getServicesValidation = {
  query: Joi.object({
    page: Joi.number().integer().min(1).optional(),
    limit: Joi.number().integer().min(1).max(100).optional(),
    status: Joi.string().valid('ACTIVE', 'INACTIVE').optional(),
  }),
};

