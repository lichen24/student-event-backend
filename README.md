Student Event Backend
A REST API for managing student events. Users can register, log in, browse events, and register for events.
Built with Node.js, TypeScript, Express, Prisma ORM, and PostgreSQL.

Team

Team Lead: Authentication, JWT, project setup, integration
Member A: Events API
Member B: Registrations API
Member C : Testing & Documentation


Tech Stack

Runtime: Node.js
Language: TypeScript
Framework: Express
ORM: Prisma 6
Database: PostgreSQL (via Docker)
Auth: JSON Web Tokens (JWT)
Password hashing: bcrypt


Prerequisites
Install these before starting:

Node.js (v18 or newer)
Docker Desktop
Git
Postman (for API testing)


Setup Instructions
1. Clone the repository
bashgit clone <repo-url>
cd student-event-backend
2. Install dependencies
bashnpm install
3. Create your .env file
Create a file named .env in the project root with this content:
envDATABASE_URL="postgresql://postgres:123456@localhost:5432/eventdb?schema=public"
JWT_SECRET="some-long-random-string"
PORT=3000

Note: .env is git-ignored. Never commit it.

4. Start PostgreSQL via Docker
bashdocker-compose up -d
This starts a Postgres container on port 5432 with database eventdb.
5. Run Prisma migrations
bashnpx prisma migrate dev
npx prisma generate
This creates the database tables and generates the Prisma client.
6. Start the server
bashnpm run dev
You should see:
Server running on port 3000
The API is now available at http://localhost:3000.

API Endpoints
Base URL: http://localhost:3000
Authentication (Users)
MethodEndpointAuth requiredDescriptionPOST/api/users/registerNoCreate a new user accountPOST/api/users/loginNoLog in and receive a JWTGET/api/users/meYesGet the current user's profile
Events
MethodEndpointAuth requiredDescriptionGET/api/eventsNoList all eventsGET/api/events/:idNoGet a single eventPOST/api/eventsYes (admin)Create a new eventPUT/api/events/:idYes (admin)Update an eventDELETE/api/events/:idYes (admin)Delete an event
Registrations
MethodEndpointAuth requiredDescriptionPOST/api/registrationsYesRegister the current user for an eventGET/api/registrations/meYesList the current user's registrationsDELETE/api/registrations/:idYesCancel one of the current user's registrations

Authentication
Protected endpoints require a JWT in the Authorization header:
Authorization: Bearer <your-jwt-token>
Get a token by calling POST /api/users/login with valid credentials. The response contains a token field.

Example Requests
Register a new user
httpPOST http://localhost:3000/api/users/register
Content-Type: application/json

{
  "email": "alice@test.com",
  "password": "secret123"
}
Log in
httpPOST http://localhost:3000/api/users/login
Content-Type: application/json

{
  "email": "alice@test.com",
  "password": "secret123"
}
Response:
json{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": { "id": 1, "email": "alice@test.com", "role": "USER" }
}
Register for an event
httpPOST http://localhost:3000/api/registrations
Authorization: Bearer <token>
Content-Type: application/json

{
  "eventId": 1
}

Testing
The project includes a Postman collection for testing all endpoints.
Run the Postman collection

Open Postman
Click Import → select postman/StudentEvents.postman_collection.json
Set up an environment with these variables:

baseUrl = http://localhost:3000
token = (auto-populated by the Login request)


Run the Login User request first to get a token
Run any other request — the token is automatically attached

Inspect the database
Prisma Studio gives you a visual UI to view and edit data:
bashnpx prisma studio
Opens at http://localhost:5555.
Test results & known bugs

See TEST_RESULTS.md for a full record of test cases and outcomes.
See BUGS_FOUND.md for the list of known bugs and their reproduction steps.


Project Structure
student-event-backend/
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── migrations/             # Migration history
├── src/
│   ├── controllers/            # Route handlers
│   ├── middleware/             # Auth middleware, error handling
│   ├── routes/                 # Express route definitions
│   ├── app.ts                  # Express app setup
│   └── server.ts               # Server entry point
├── postman/
│   └── StudentEvents.postman_collection.json
├── docker-compose.yml          # PostgreSQL container config
├── .env                        # Environment variables (not committed)
├── .env.example                # Example env file
├── package.json
├── tsconfig.json
├── README.md
├── TEST_RESULTS.md
└── BUGS_FOUND.md

Common Issues & Troubleshooting
"Environment variable not found: DATABASE_URL"
Prisma 6 doesn't auto-load .env. Make sure:

.env exists in the project root
dotenv is installed: npm install dotenv
prisma.config.ts includes import 'dotenv/config' at the top

"Cannot connect to database"

Make sure Docker is running: docker ps
Restart the database: docker-compose down && docker-compose up -d

"Cannot find module './routes/...'"

Run npm install again
Make sure all team branches are merged before running

Port 3000 already in use
Change PORT=3000 to another port (e.g. PORT=3001) in your .env file.

Git Workflow

Each member works on a feature branch (feature/auth, feature/events, feature/registrations, testing/senja)
Open a Pull Request to main when ready
Team lead reviews and merges


License
University course project — for educational use only.
