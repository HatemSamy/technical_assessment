/**
 * @openapi
 * /auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: User login
 *     description: >
 *       Authenticate a user using email and password and return a JWT access token
 *       along with basic user information. The token can be used to access protected
 *       endpoints.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *           examples:
 *             validCredentials:
 *               summary: Valid login request
 *               value:
 *                 email: admin@serfix.sa
 *                 password: Admin123!
 *     responses:
 *       200:
 *         $ref: '#/components/responses/LoginSuccess'
 *       400:
 *         $ref: '#/components/responses/ValidationErrorAuth'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
