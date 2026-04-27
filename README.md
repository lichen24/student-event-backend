# Student Event Backend

A REST API for managing student events. Users can register, log in, browse events, and register for events.

Built with Node.js, TypeScript, Express, Prisma ORM, and PostgreSQL.

---

## Team

- Team Lead: Authentication, JWT, project setup, integration
- Member A: Events API
- Member B: Registrations API
- Member C (Senja): Testing & Documentation

---

## Tech Stack

- Runtime: Node.js
- Language: TypeScript
- Framework: Express
- ORM: Prisma 6
- Database: PostgreSQL (via Docker)
- Auth: JSON Web Tokens (JWT)
- Password hashing: bcrypt

---

## Prerequisites

Install these before starting:

- Node.js v18 or newer
- Docker Desktop
- Git
- Postman (for API testing)

---

## Setup Instructions

### 1. Clone the repository

    git clone <repo-url>
    cd student-event-backend

### 2. Install dependencies

    npm install

### 3. Create your `.env` file

Create a file named `.env` in the project root with this content:

    DATABASE_URL="postgresql://postgres:123456@localhost:5432/eventdb?schema=public"
    JWT_SECRET="some-long-random-string"
    PORT=3000

`.env` is git-ignored. Never commit it.

### 4. Start PostgreSQL via Docker

    docker-compose up -d

This starts a Postgres container on port 5432 with database `eventdb`.

### 5. Run Prisma migrations

    npx prisma migrate dev
    npx prisma generate

This creates the database tables and generates the Prisma client.

### 6. Start the server

    npm run dev

You should see:

    Server running on port 3000

The API is now available at http://localhost:3000.

---

## API Endpoints

Base URL: http://localhost:3000

### Authentication (Users)

| Method | Endpoint | Auth required | Description |
|--------|----------|---------------|-------------|
| POST | /api/users/register | No | Create a new user account |
| POST | /api/users/login | No | Log in and receive a JWT |
| GET | /api/users/me | Yes | Get the current user's profile |

### Events

| Method | Endpoint | Auth required | Description |
|--------|----------|---------------|-------------|
| GET | /api/events | No | List all events |
| GET | /api/events/:id | No | Get a single event |
| POST | /api/events | Yes (admin) | Create a new event |
| PUT | /api/events/:id | Yes (admin) | Update an event |
| DELETE | /api/events/:id | Yes (admin) | Delete an event |

### Registrations

| Method | Endpoint | Auth required | Description |
|--------|----------|---------------|-------------|
| POST | /api/registrations | Yes | Register the current user for an event |
| GET | /api/registrations/me | Yes | List the current user's registrations |
| DELETE | /api/registrations/:id | Yes | Cancel one of the current user's registrations |

---

## Authentication

Protected endpoints require a JWT in the `Authorization` header:

    Authorization: Bearer <your-jwt-token>

Get a token by calling `POST /api/users/login` with valid credentials.

---

## Example Requests

### Register a new user

    POST http://localhost:3000/api/users/register
    Content-Type: application/json

    {
      "email": "alice@test.com",
      "password": "secret123"
    }

### Log in

    POST http://localhost:3000/api/users/login
    Content-Type: application/json

    {
      "email": "alice@test.com",
      "password": "secret123"
    }

Response:

    {
      "token": "eyJhbGciOiJIUzI1NiIs...",
      "user": { "id": 1, "email": "alice@test.com", "role": "USER" }
    }

### Register for an event

    POST http://localhost:3000/api/registrations
    Authorization: Bearer <token>
    Content-Type: application/json

    {
      "eventId": 1
    }

---

## Testing

The project includes a Postman collection for testing all endpoints.

### Run the Postman collection

1. Open Postman
2. Click Import → select `postman/StudentEvents.postman_collection.json`
3. Set up an environment with these variables:
   - `baseUrl` = `http://localhost:3000`
   - `token` = (auto-populated by the Login request)
4. Run the Login User request first to get a token
5. Run any other request — the token is automatically attached

### Inspect the database

    npx prisma studio

Opens at http://localhost:5555.

### Test results & known bugs

- See `TEST_RESULTS.md` for a full record of test cases and outcomes.
- See `BUGS_FOUND.md` for known bugs and reproduction steps.

---

## Project Structure

    student-event-backend/
    ├── prisma/
    │   ├── schema.prisma
    │   └── migrations/
    ├── src/
    │   ├── controllers/
    │   ├── middleware/
    │   ├── routes/
    │   ├── app.ts
    │   └── server.ts
    ├── postman/
    │   └── StudentEvents.postman_collection.json
    ├── docker-compose.yml
    ├── .env (not committed)
    ├── package.json
    ├── tsconfig.json
    ├── README.md
    ├── TEST_RESULTS.md
    └── BUGS_FOUND.md

---

## Common Issues

**"Environment variable not found: DATABASE_URL"**
Prisma 6 doesn't auto-load `.env`. Make sure `.env` exists, `dotenv` is installed (`npm install dotenv`), and `prisma.config.ts` includes `import 'dotenv/config'` at the top.

**"Cannot connect to database"**
Make sure Docker is running (`docker ps`). Restart with `docker-compose down && docker-compose up -d`.

**Port 3000 already in use**
Change `PORT=3000` to another port in your `.env`.

---

## Git Workflow

- Each member works on a feature branch
- Open a Pull Request to `main` when ready
- Team lead reviews and merges

---

## License

University course project - for educational use only.
