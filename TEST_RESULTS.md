# API Test Results — Student Events Backend

**Tester:** Senja (Member C)
**Date:** 2026-04-27
**Branch tested:** main + auth.routes.ts stub
**Server:** http://localhost:3000

---

## POST /api/users/register

### Test 1.1 — Valid Registration
- **Body:** `{"email":"test@test.com","password":"test123","name":"Test"}`
- **Expected:** 201 Created with user object
- **Actual:** 201 Created, returned user with id, email, role, password (hashed)
- **Result:** PASS
- **Notes:** Password hash leaks in response — see BUG-002

### Test 1.2 — Duplicate Email
- **Body:** Same as Test 1.1 (email already in DB)
- **Expected:** 400 or 409 with "already exists" message
- **Actual:** 400 Bad Request, `{"message": "User already exists"}`
- **Result:** PASS
- **Screenshot:** screenshots/test-1.2-duplicate-email.png

### Test 1.3 — Missing Email
- **Body:** `{"password":"test123","name":"Test"}`
- **Expected:** 400 Bad Request, validation error
- **Actual:** [fill in after running]
- **Result:** [PASS / FAIL]

### Test 1.4 — Short Password (1 character)
- **Body:** `{"email":"shortpass@test.com","password":"1","name":"Short"}`
- **Expected:** 400 (if validation exists)
- **Actual:** [fill in after running]
- **Result:** [PASS / FAIL — if 201, file BUG-003]