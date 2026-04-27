# Bugs Found During Testing

## BUG-001: Missing auth.routes.ts file
- **Severity**: Medium-High
- **Found by**: Senja (Member C)
- **Date**: 2026-04-27
- **Branch**: testing/senja

### Description
`src/app.ts` imports `./routes/auth.routes.js`, but the actual file `src/routes/auth.routes.ts` does not exist. Only `user.routes.ts` exists in `src/routes/`.

### Steps to reproduce
1. Clone the repo
2. Look in `src/routes/` — only one file
3. Look in `src/app.ts` — two route imports

### Expected
Either the file should exist, or the import should be removed.

### Notes
- Login and register are currently inside `user.routes.ts` (paths `/api/users/register`, `/api/users/login`).
- Team needs to decide if auth routes should live separately.

## BUG-002: Register response leaks password hash
- **Severity**: Medium (security best practice)
- **Endpoint**: POST /api/users/register
- **Date**: 2026-04-27

### Description
The register response includes the `password` field (bcrypt hash). 
Even though the hash itself is hard to crack, APIs should never return 
password fields. It's an information leak that helps attackers.

### Reproduce
1. POST /api/users/register with valid body
2. Look at the 201 response — `password` field is present

### Suggested fix
In user.controller.ts, before returning the user, exclude password.
With Prisma you can use `select` or destructure it out:
   const { password: _, ...userWithoutPassword } = user;
   res.status(201).json(userWithoutPassword);

## BUG-003: Missing input validation on register endpoint
- **Severity**: Medium-High
- **Endpoint**: POST /api/users/register
- **Found by**: Senja (Member C)
- **Date**: 2026-04-27

### Description
Sending a request with missing required fields returns 500 Internal Server Error 
with a vague "Register failed" message, instead of a proper 400 Bad Request 
with a clear validation message.

### Steps to reproduce
1. POST http://localhost:3000/api/users/register
2. Body (raw, JSON):
   {
     "password": "test123",
     "name": "Test"
   }
3. Send

### Actual
- Status: 500 Internal Server Error
- Body: {"message": "Register failed"}

### Expected
- Status: 400 Bad Request
- Body: {"message": "Email is required"} (or similar specific message)

### Why this matters
- 500 status codes indicate server bugs, not client mistakes. This makes 
  it impossible for the frontend to distinguish between user input errors 
  (which should show a friendly message) and real server failures (which 
  should show "something went wrong, try again").
- The generic "Register failed" message gives the frontend nothing useful 
  to show the user.

### Suggested fix
Add input validation to the register controller (or use a validation library 
like Zod or express-validator). Validate that:
- email is present, is a string, and matches an email format
- password is present, is a string, and meets minimum length
- name is present and is a string

Return 400 with a specific message for each missing/invalid field.