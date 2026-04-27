# API Test Results

Tester: Senja (Member C)
Date: April 2026
Tool: Postman
Base URL: http://localhost:3000

---

## Summary

| Endpoint | Tests | Passed | Failed | Bugs found |
|----------|-------|--------|--------|------------|
| POST /api/users/register | 6 | 2 | 4 | BUG-002, BUG-003, BUG-004, BUG-005 |
| POST /api/users/login | 1 | 1 | 0 | — |
| GET /api/users/me | 1 | 1 | 0 | — |
| POST /api/registrations | 1 | 0 | 1 | BUG-006 |
| GET /api/registrations/me | Blocked | — | — | Blocked by BUG-006 |
| DELETE /api/registrations/:id | Blocked | — | — | Blocked by BUG-006 |
| GET /api/events | Not tested | — | — | Awaiting Member A |

Total tests run: 9 | Passing: 4 | Failing: 5 | Blocked: 4

---

## 1. POST /api/users/register

### 1.1 Register valid user
Body: `{"email": "test@test.com", "password": "test123"}`
Expected: 201 Created. Actual: 201 Created. **PASS**

### 1.2 Duplicate user
Body: same as 1.1
Expected: 400 Bad Request. Actual: 400 Bad Request — "User already exists". **PASS**

### 1.3 Missing email
Body: `{"password": "secret123"}`
Expected: 400. Actual: 500 — "Register failed". **FAIL → BUG-002**

### 1.4 Empty body
Body: `{}`
Expected: 400. Actual: 500 — "Register failed". **FAIL → BUG-003**

### 1.5 Invalid email format
Body: `{"email": "notanemail", "password": "secret123"}`
Expected: 400. Actual: 201 Created. **FAIL → BUG-004**

### 1.6 Weak password
Body: `{"email": "weak@test.com", "password": "a"}`
Expected: 400. Actual: 201 Created. **FAIL → BUG-005**

---

## 2. POST /api/users/login

### 2.1 Valid credentials
Body: `{"email": "test@test.com", "password": "test123"}`
Expected: 200 with JWT. Actual: 200 with token + user. **PASS**

---

## 3. GET /api/users/me

### 3.1 With valid token
Auth: Bearer Token from login.
Expected: 200 with user info. Actual: 200 with id, email, role. **PASS**

---

## 4. POST /api/registrations

### R.1 Register for event with valid token
Auth: Bearer Token (fresh from Login).
Body: `{"eventId": 1}` (event pre-created in Prisma Studio)
Expected: 201 Created. Actual: 401 Unauthorized. **FAIL → BUG-006**

### R.2 – R.9 BLOCKED
All other registration tests are blocked by BUG-006. To re-run after fix:
- R.2 No token (expect 401)
- R.3 Missing eventId (expect 400)
- R.4 Non-existent event (expect 404)
- R.5 Duplicate registration (expect 400)
- R.6 Get my registrations with token (expect 200)
- R.7 Get my registrations without token (expect 401)
- R.8 Cancel own registration (expect 200/204)
- R.9 Cancel non-existent registration (expect 404)

---

## 5. Events API

Not tested — Member A's events branch was not yet merged into main.

---

## Notes for Team Lead

Critical to fix before demo:
- BUG-006 blocks the entire registrations flow — please verify the auth middleware import in registration.routes.ts.
- BUG-002 and BUG-003 are easy wins: input validation in user.controller.ts.

Lower priority:
- BUG-004 (email format) and BUG-005 (password length) before any release.

---

## Test Environment

- Node.js + TypeScript
- PostgreSQL in Docker (docker-compose up -d)
- Prisma migrations applied (npx prisma migrate dev)
- Server running on port 3000 (npm run dev)
- Test user: test@test.com / test123
- Test event: id = 1 (created via Prisma Studio)