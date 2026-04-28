# 🎓 Student Event Backend API

A RESTful backend system for managing student events and registrations.

Users can:

* Register and log in
* Browse events
* Register for events
* Manage their registrations

Built with **Node.js, TypeScript, Express, Prisma ORM, and PostgreSQL**.

---

## 🚀 Features

### 🔐 Authentication

* User registration
* JWT-based login
* Protected routes via middleware

### 📅 Events

* Create event
* Get all events
* Get event by ID
* Update event
* Delete event

### 📝 Registrations

* Register for event
* Prevent duplicate registrations
* View personal registrations
* Cancel registration

---

## 🛠 Tech Stack

* Node.js
* TypeScript
* Express
* Prisma ORM (v6)
* PostgreSQL (Docker)
* JWT Authentication
* bcrypt

---

## 👥 Team

* **Lili Chen** – Authentication, Testing & CI
* **Mauranen Mette** – Events API
* **Ojala Ronja** – Registrations API
* **Hänninen Senja** – Testing & Documentation

---

## ⚙️ Setup Instructions

### 1. Clone the project

```bash
git clone <repo-url>
cd student-event-backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment

Create a `.env` file in the root:

```env
DATABASE_URL="postgresql://postgres:123456@localhost:5432/eventdb?schema=public"
JWT_SECRET="your_secret_key"
PORT=3000
```

---

### 4. Start database (Docker)

```bash
docker-compose up -d
```

---

### 5. Run migrations

```bash
npx prisma migrate dev
npx prisma generate
```

---

### 6. Start server

```bash
npm run dev
```

👉 Server runs at:
**http://localhost:3000**

---

## 📡 API Overview

### 🔐 Authentication

| Method | Endpoint            | Description      |
| ------ | ------------------- | ---------------- |
| POST   | /api/users/register | Register user    |
| POST   | /api/users/login    | Login            |
| GET    | /api/users/me       | Get current user |

---

### 📅 Events

| Method | Endpoint        | Description    |
| ------ | --------------- | -------------- |
| GET    | /api/events     | Get all events |
| GET    | /api/events/:id | Get event      |
| POST   | /api/events     | Create event   |
| PUT    | /api/events/:id | Update event   |
| DELETE | /api/events/:id | Delete event   |

---

### 📝 Registrations

| Method | Endpoint               | Description         |
| ------ | ---------------------- | ------------------- |
| POST   | /api/registrations     | Register for event  |
| GET    | /api/registrations/me  | My registrations    |
| DELETE | /api/registrations/:id | Cancel registration |

---

## 🔑 Authentication

Protected endpoints require a JWT token:

```text
Authorization: Bearer <token>
```

Get token via:

```http
POST /api/users/login
```

---

## 🧪 Automated Testing

This project includes automated integration tests using **Jest** and **Supertest**.

Test coverage includes:

* Authentication (register, login, profile)
* Event management
* Registration system

Run tests locally:

```bash
npm test
```

All tests are also executed automatically in the CI pipeline.

---

## 🔄 Continuous Integration (CI)

The project uses **GitHub Actions** to:

* Install dependencies
* Run Prisma migrations
* Execute tests

This ensures the backend works correctly in every commit.

---

## 🗂 Project Structure

```
src/
 ├── controllers/
 ├── routes/
 ├── middleware/
 ├── services/
 ├── tests/
 ├── app.ts
 └── server.ts
```

---

## ⚠️ Common Issues

### Database not connecting

```bash
docker-compose down
docker-compose up -d
```

### Prisma environment issue

Ensure `.env` exists and:

```ts
import 'dotenv/config'
```

### Port already in use

Change in `.env`:

```env
PORT=3001
```

---

## 🎯 Status

* ✅ Backend completed
* ✅ All endpoints implemented
* ✅ Automated tests passing
* ✅ CI pipeline passing
* ✅ Ready for submission

---

## 💡 Future Improvements

* Role-based authorization (Admin)
* Event capacity limits
* Pagination
* API documentation (Swagger)
* Deployment (Render / Railway)

---

## 📄 License

Course project – for educational use only
