/**
 * @openapi
 * /services:
 *   post:
 *     tags:
 *       - Services
 *     summary: Create a new service
 *     description: >
 *       Create a new service entry. This endpoint is restricted to users with the
 *       ADMIN role. The authenticated admin is recorded as the creator of the service.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateServiceRequest'
 *           examples:
 *             createService:
 *               summary: Valid create service request
 *               value:
 *                 name: Electrical Maintenance
 *                 description: All kinds of electrical maintenance and troubleshooting.
 *                 status: ACTIVE
 *     responses:
 *       201:
 *         $ref: '#/components/responses/ServiceCreated'
 *       400:
 *         $ref: '#/components/responses/ValidationErrorService'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 */

/**
 * @openapi
 * /services:
 *   get:
 *     tags:
 *       - Services
 *     summary: Get list of services
 *     description: >
 *       Retrieve a paginated list of services. Supports optional filtering by service
 *       status. This endpoint is available to any authenticated user.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           example: 1
 *         description: Page number for pagination (defaults to 1).
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           example: 10
 *         description: Number of items per page (defaults to 10).
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [ACTIVE, INACTIVE]
 *           example: ACTIVE
 *         description: Optional filter by service status.
 *     responses:
 *       200:
 *         $ref: '#/components/responses/ServiceList'
 *       400:
 *         $ref: '#/components/responses/ValidationErrorServiceGet'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
