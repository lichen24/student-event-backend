# 🎓 Student Event Backend API

A RESTful backend system for managing student events and registrations.

Users can:
- Register and log in
- Browse events
- Register for events
- Manage their registrations

Built with **Node.js, TypeScript, Express, Prisma, and PostgreSQL**.

---

## 🚀 Features

### 🔐 Authentication
- User registration
- JWT login
- Protected routes via middleware

### 📅 Events
- Create event
- Get all events
- Get event by ID
- Update event
- Delete event

### 📝 Registrations
- Register for event
- Prevent duplicate registrations
- View my registrations
- Cancel registration

---

## 🛠 Tech Stack

- Node.js
- TypeScript
- Express
- Prisma ORM (v6)
- PostgreSQL (Docker)
- JWT Authentication
- bcrypt

---

## 👥 Team

- **Team Lead** – Authentication, JWT, Integration
- **Member A** – Events API
- **Member B** – Registrations API
- **Member C** – Testing & Documentation

---

## ⚙️ Setup Instructions

### 1. Clone project
```bash
git clone <repo-url>
cd student-event-backend

2. Install dependencies 
npm install

3. Configure environment
Create .env file:
DATABASE_URL="postgresql://postgres:123456@localhost:5432/eventdb"
JWT_SECRET="your_secret_key"
PORT=3000

4. Start database (Docker)
docker-compose up -d

5. Run migrations
npx prisma migrate dev
npx prisma generate

6. Start server
npm run dev

👉 Server runs at:
http://localhost:3000

📡 API Overview
🔐 Auth
Method	Endpoint	Description
POST	/api/users/register	Register user
POST	/api/users/login	Login
GET	/api/users/me	Get current user

📅 Events
Method	Endpoint	Description
GET	/api/events	Get all events
GET	/api/events/:id	Get event
POST	/api/events	Create event
PUT	/api/events/:id	Update event
DELETE	/api/events/:id	Delete event

📝 Registrations
Method	Endpoint	Description
POST	/api/registrations	Register for event
GET	/api/registrations/me	My registrations
DELETE	/api/registrations/:id	Cancel registration

🔑 Authentication

Protected routes require:
Authorization: Bearer <token>
Get token via:
POST /api/users/login

🧪 Testing
Tested using Postman
Includes:
Auth flow
Event CRUD
Registration flow

👉 Postman collection available in /postman

🗂 Project Structure
src/
 ├── controllers/
 ├── routes/
 ├── middleware/
 ├── services/
 ├── app.ts
 └── server.ts
 
⚠️ Common Issues
Database not connecting
    docker-compose down
    docker-compose up -d
    
Prisma env error
Make sure .env exists and:
    import 'dotenv/config'
    
Port already used
Change in .env:
    PORT=3001
    
🎯 Status
✅ Completed
✅ Fully tested
✅ Ready for submission

💡 Future Improvements
Role-based access (Admin)
Event capacity limit
Pagination
Deployment (Render / Railway)

📄 License
Course project – educational use only
