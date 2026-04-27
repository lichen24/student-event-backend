# Bugs Found During Testing

Tester: Senja (Member C)
Test environment: Local development (http://localhost:3000)
Tools: Postman, Prisma Studio

---

## BUG-001: Server crashes on startup when auth.routes.ts is missing
Endpoint: N/A (server startup)
Severity: High
Status: Resolved (caused by accidental local changes; reverted with git checkout)

Steps to reproduce:
1. Have an app.ts that imports `./routes/auth.routes.js`
2. Run `npm run dev`
3. Server crashes with "Cannot find module './routes/auth.routes.js'"

Notes: Auth routes are actually under user.routes.ts (mounted at /api/users). The endpoints are /api/users/register, /api/users/login, /api/users/me.

---

## BUG-002: Register endpoint returns 500 when email is missing
Endpoint: POST /api/users/register
Severity: Medium

Steps to reproduce:
1. POST /api/users/register with body `{"password": "secret123"}` (no email)
2. Expected: 400 Bad Request with a clear validation error
3. Actual: 500 Internal Server Error — `{"message": "Register failed"}`

Recommended fix: Add input validation that returns 400 with a message like "email is required".

---

## BUG-003: Register endpoint returns 500 when body is empty
Endpoint: POST /api/users/register
Severity: Medium

Steps to reproduce:
1. POST /api/users/register with empty body `{}`
2. Expected: 400 Bad Request
3. Actual: 500 Internal Server Error — `{"message": "Register failed"}`

Recommended fix: Validate that both email and password are present before hitting the database.

---

## BUG-004: Register accepts invalid email format
Endpoint: POST /api/users/register
Severity: Low

Steps to reproduce:
1. POST /api/users/register with body `{"email": "notanemail", "password": "secret123"}`
2. Expected: 400 Bad Request — "invalid email format"
3. Actual: 201 Created — user created with email = "notanemail"

Recommended fix: Validate email format with a regex or library like `validator`.

---

## BUG-005: Register accepts very weak passwords (1 character)
Endpoint: POST /api/users/register
Severity: Low

Steps to reproduce:
1. POST /api/users/register with body `{"email": "weak@test.com", "password": "a"}`
2. Expected: 400 Bad Request
3. Actual: 201 Created — user created with a 1-character password

Recommended fix: Enforce a minimum password length (at least 8 characters).

---

## BUG-006: Valid JWT token rejected as Unauthorized on /api/registrations
Endpoint: POST /api/registrations
Severity: High (blocks registration testing)

Steps to reproduce:
1. POST /api/users/login with valid credentials → returns 200 OK with JWT token
2. POST /api/registrations with `Authorization: Bearer <token>` and body `{"eventId": 1}`
3. Expected: 201 Created
4. Actual: 401 Unauthorized — `{"message": "Unauthorized"}`

Notes:
- The same token works on GET /api/users/me (returns 200 OK)
- Token was freshly generated from /api/users/login
- Issue may be in the registration route's auth middleware import

Impact: Cannot test any authenticated registration endpoints (R.1, R.5–R.9 all blocked).

Recommended fix: Verify authMiddleware import in src/routes/registration.routes.ts matches the one in user.routes.ts. Confirm JWT_SECRET is consistent.

---

## Summary

| Bug ID | Endpoint | Severity | Status |
|--------|----------|----------|--------|
| BUG-001 | Server startup | High | Resolved |
| BUG-002 | POST /api/users/register | Medium | Open |
| BUG-003 | POST /api/users/register | Medium | Open |
| BUG-004 | POST /api/users/register | Low | Open |
| BUG-005 | POST /api/users/register | Low | Open |
| BUG-006 | POST /api/registrations | High | Open |