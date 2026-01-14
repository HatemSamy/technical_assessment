# Service Management Backend API

This task is a Node.js (Express) RESTful API for managing services with JWT authentication and role-based access control using Prisma ORM and PostgreSQL.

## 🚀 Tech Stack

- **Backend**: Node.js, Express.js (ES6 modules)
- **ORM**: Prisma
- **Database**: PostgreSQL
- **Auth**: JWT (jsonwebtoken, bcryptjs)
- **Validation**: Joi
- **Docs**: Swagger (swagger-jsdoc, swagger-ui-express)

## ✨ Features

- **Login API** that returns a JWT.
- **Role-based access control**:
  - Admin users can create services.
  - Any authenticated user can list services.
- **Create Service API** (Admin only):
  - Validates request payload.
  - Persists to PostgreSQL via Prisma.
  - Tracks `createdBy` and `createdAt`.
- **Get Services API**:
  - Authenticated endpoint.
  - Supports **pagination** (`page`, `limit`) and **status filtering**.
- **Global Error Handling**:
  - Centralized error-handling middleware for consistent API responses.
  - Proper HTTP status codes and error messages.
- **Swagger UI** with JWT authentication support (`/api-docs`).

## 📁 Project Structure

- `src/server.js` – App bootstrap and middleware registration.
- `src/routes` – Route definitions (auth, services).
- `src/controllers` – Controllers for auth and services.
- `src/middlewares` – Auth, RBAC, error, and 404 handlers.
- `src/models/prismaClient.js` – Prisma client instance.
- `src/config/swagger.js` – Swagger/OpenAPI configuration.
- `src/utils` – Helper utilities (e.g., `ApiError`).
- `prisma/schema.prisma` – Prisma data models and DB configuration.

## ⚙️ Environment Variables

Create a `.env` file in the project root:

```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
JWT_SECRET="your_jwt_secret_here"
PORT=3000
```

## �️ Setup & Run

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Configure PostgreSQL**:

   - Ensure your PostgreSQL instance is running.
   - Create a database for this project.
   - Set `DATABASE_URL` in `.env`.

3. **Prisma migrations & generate client**:

   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```

4. **Seed an admin user**:

   ```bash
   npm run seed
   ```

   This will create an initial admin:

   - Email: `admin@serfix.sa`
   - Password: `Admin123!`

5. **Run the API**:

   ```bash
   npm run dev
   ```

   The server will start on `http://localhost:3000`.

## 🔗 API Endpoints

### Auth

- **POST** `/api/auth/login`
  - Body: `{ "email": "user@example.com", "password": "secret" }`
  - Returns: `token` (JWT) and user info.

### Services

- **POST** `/api/services` (Admin only)
  - Headers: `Authorization: Bearer <JWT>`
  - Body: `{ "name": "Plumbing", "description": "Plumbing services", "status": "ACTIVE" }`
- **GET** `/api/services`
  - Headers: `Authorization: Bearer <JWT>`
  - Query:
    - `page` (optional, default `1`)
    - `limit` (optional, default `10`)
    - `status` (optional, `ACTIVE` or `INACTIVE`)

## 📖 Swagger Documentation

- Swagger UI is available at: `http://localhost:3000/api-docs`
- Click **Authorize** in the top-right and provide:

  ```text
  Bearer <your-jwt-token>
  ```

  to test protected endpoints.

## 📤 Delivery

1. Initialize a Git repository:

   ```bash
   git init
   git add .
   git commit -m "Initial implementation of service management API"
   ```

2. Create a repository on GitHub and push:

   ```bash
   git remote add origin <your-repo-url>
   git push -u origin main
   ```
