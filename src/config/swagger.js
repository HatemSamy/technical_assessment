import swaggerJsdoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Service Management API',
    version: '1.0.0',
    description:
      'RESTful API for authentication and managing services (create and list) with role-based access control.',
  },
  servers: [
    {
      url: 'http://localhost:3000/api',
      description: 'Local development server',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description:
          'JWT authorization using the Bearer scheme. Example: "Authorization: Bearer {token}"',
      },
    },
    schemas: {
      User: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            example: 1,
          },
          username: {
            type: 'string',
            example: 'admin',
          },
          email: {
            type: 'string',
            format: 'email',
            example: 'admin@serfix.sa',
          },
          role: {
            type: 'string',
            enum: ['ADMIN', 'USER'],
            example: 'ADMIN',
          },
        },
      },
      LoginRequest: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: {
            type: 'string',
            format: 'email',
            example: 'admin@serfix.sa',
          },
          password: {
            type: 'string',
            minLength: 6,
            example: 'Admin123!',
          },
        },
      },
      LoginResponse: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
            example: true,
          },
          data: {
            type: 'object',
            properties: {
              token: {
                type: 'string',
                description: 'JWT access token',
                example:
                  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoiYWRtaW5Ac2VyZml4LnNhIiwicm9sZSI6IkFETUlOIiwiZXhwIjoxNzM2NjE1MjAwfQ.abc123signature',
              },
              user: {
                $ref: '#/components/schemas/User',
              },
            },
          },
        },
      },
      Service: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            example: 1,
          },
          name: {
            type: 'string',
            example: 'Plumbing',
          },
          description: {
            type: 'string',
            nullable: true,
            example: 'Professional plumbing services for residential properties.',
          },
          status: {
            type: 'string',
            enum: ['ACTIVE', 'INACTIVE'],
            example: 'ACTIVE',
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            example: '2026-01-14T12:34:56.789Z',
          },
          createdById: {
            type: 'integer',
            example: 1,
          },
          createdBy: {
            type: 'object',
            properties: {
              id: {
                type: 'integer',
                example: 1,
              },
              username: {
                type: 'string',
                example: 'admin',
              },
              email: {
                type: 'string',
                format: 'email',
                example: 'admin@serfix.sa',
              },
              role: {
                type: 'string',
                enum: ['ADMIN', 'USER'],
                example: 'ADMIN',
              },
            },
          },
        },
      },
      CreateServiceRequest: {
        type: 'object',
        required: ['name'],
        properties: {
          name: {
            type: 'string',
            minLength: 2,
            maxLength: 100,
            example: 'Electrical Maintenance',
          },
          description: {
            type: 'string',
            maxLength: 500,
            nullable: true,
            example: 'All kinds of electrical maintenance and troubleshooting.',
          },
          status: {
            type: 'string',
            enum: ['ACTIVE', 'INACTIVE'],
            example: 'ACTIVE',
          },
        },
      },
      PaginationMeta: {
        type: 'object',
        properties: {
          page: {
            type: 'integer',
            example: 1,
          },
          limit: {
            type: 'integer',
            example: 10,
          },
          total: {
            type: 'integer',
            example: 25,
          },
          totalPages: {
            type: 'integer',
            example: 3,
          },
        },
      },
      ServiceListResponse: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
            example: true,
          },
          data: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/Service',
            },
          },
          pagination: {
            $ref: '#/components/schemas/PaginationMeta',
          },
        },
      },
      ServiceCreatedResponse: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
            example: true,
          },
          data: {
            $ref: '#/components/schemas/Service',
          },
        },
      },
      ErrorResponse: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: 'catch error',
          },
          errMas: {
            type: 'string',
            example: 'Invalid email or password',
          },
          stack: {
            type: 'string',
            description: 'Error stack trace (only in DEV mode)',
            example: 'Error: Invalid email or password\n    at login (/path/to/auth.controller.js:12:11)\n    ...',
          },
        },
        required: ['message', 'errMas']
      },
      ValidationErrorResponse: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: 'catch error',
          },
          errMas: {
            type: 'string',
            example: 'Validation error: "email" is required, "password" must be at least 6 characters',
          },
          stack: {
            type: 'string',
            description: 'Error stack trace (only in DEV mode)',
          },
        },
        required: ['message', 'errMas']
      },
    },
    responses: {
      LoginSuccess: {
        description: 'Successful login',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/LoginResponse',
            },
            examples: {
              success: {
                summary: 'Successful login',
                value: {
                  success: true,
                  data: {
                    token:
                      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoiYWRtaW5Ac2VyZml4LnNhIiwicm9sZSI6IkFETUlOIiwiZXhwIjoxNzM2NjE1MjAwfQ.abc123signature',
                    user: {
                      id: 1,
                      username: 'admin',
                      email: 'admin@serfix.sa',
                      role: 'ADMIN',
                    },
                  },
                },
              },
            },
          },
        },
      },
      ServiceCreated: {
        description: 'Service created successfully',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ServiceCreatedResponse',
            },
            examples: {
              created: {
                summary: 'Service created',
                value: {
                  success: true,
                  data: {
                    id: 3,
                    name: 'Electrical Maintenance',
                    description:
                      'All kinds of electrical maintenance and troubleshooting.',
                    status: 'ACTIVE',
                    createdAt: '2026-01-14T12:35:45.000Z',
                    createdById: 1,
                    createdBy: {
                      id: 1,
                      username: 'admin',
                      email: 'admin@serfix.sa',
                      role: 'ADMIN',
                    },
                  },
                },
              },
            },
          },
        },
      },
      ServiceList: {
        description: 'List of services',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ServiceListResponse',
            },
            examples: {
              list: {
                summary: 'Paginated list of services',
                value: {
                  success: true,
                  data: [
                    {
                      id: 1,
                      name: 'Plumbing',
                      description:
                        'Professional plumbing services for residential properties.',
                      status: 'ACTIVE',
                      createdAt: '2026-01-10T09:15:23.000Z',
                      createdById: 1,
                      createdBy: {
                        id: 1,
                        username: 'admin',
                        email: 'admin@serfix.sa',
                        role: 'ADMIN',
                      },
                    },
                    {
                      id: 2,
                      name: 'General Maintenance',
                      description: 'General maintenance and repair services.',
                      status: 'INACTIVE',
                      createdAt: '2026-01-11T14:05:10.000Z',
                      createdById: 1,
                      createdBy: {
                        id: 1,
                        email: 'admin@serfix.sa',
                        role: 'ADMIN',
                      },
                    },
                  ],
                  pagination: {
                    page: 1,
                    limit: 10,
                    total: 2,
                    totalPages: 1,
                  },
                },
              },
            },
          },
        },
      },
      UnauthorizedError: {
        description: 'Authentication error - missing or invalid token',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ErrorResponse',
            },
            examples: {
              noToken: {
                summary: 'Missing Authorization header',
                value: {
                  message: 'catch error',
                  errMas: 'Authentication token missing or invalid',
                },
              },
              invalidToken: {
                summary: 'Invalid or expired token',
                value: {
                  message: 'catch error',
                  errMas: 'Token has expired',
                },
              },
            },
          },
        },
      },
      ForbiddenError: {
        description: 'Authorization error - insufficient permissions',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ErrorResponse',
            },
            examples: {
              forbidden: {
                summary: 'User is not allowed to perform this action',
                value: {
                  message: 'catch error',
                  errMas: 'Insufficient permissions',
                },
              },
            },
          },
        },
      },
      ValidationError: {
        description: 'Validation error',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ValidationErrorResponse',
            },
            examples: {
              invalidBody: {
                summary: 'Invalid request body',
                value: {
                  message: 'catch error',
                  errMas: 'Validation error: "email" is required, "password" length must be at least 6 characters long',
                },
              },
            },
          },
        },
      },
      ValidationErrorAuth: {
        description: 'Validation error for authentication endpoints',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ValidationErrorResponse',
            },
            examples: {
              invalidLogin: {
                summary: 'Invalid login request',
                value: {
                  message: 'catch error',
                  errMas: 'Validation error: "email" is required, "password" length must be at least 6 characters long',
                },
              },
            },
          },
        },
      },
      ValidationErrorService: {
        description: 'Validation error for service endpoints',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ValidationErrorResponse',
            },
            examples: {
              createServiceMissingFields: {
                summary: 'Missing required fields when creating service',
                value: {
                  message: 'catch error',
                  errMas: 'Validation error: "name" is required, "status" must be either \'ACTIVE\' or \'INACTIVE\'',
                },
              },
              createServiceInvalidStatus: {
                summary: 'Invalid status value',
                value: {
                  message: 'catch error',
                  errMas: 'Validation error: "status" must be either \'ACTIVE\' or \'INACTIVE\'',
                },
              },
            },
          },
        },
      },
      ValidationErrorServiceGet: {
        description: 'Validation error for GET /services endpoint (query parameters)',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ValidationErrorResponse',
            },
            examples: {
              invalidQueryParams: {
                summary: 'Invalid query parameters',
                value: {
                  message: 'catch error',
                  errMas: 'Validation error: "page" must be a positive integer, "limit" must be a positive integer, "status" must be either \'ACTIVE\' or \'INACTIVE\'',
                },
              },
            },
          },
        },
      },
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ['./src/docs/*.js'],
};

export const swaggerSpec = swaggerJsdoc(options);
