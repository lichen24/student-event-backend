# Bugs Found and Fixes

## Overview

During development and testing, several issues were identified and resolved.
These bugs helped improve the stability and correctness of the backend system.

---

## BUG-001: JWT userId mismatch

**Issue:**
Mismatch between `userId` (JWT payload) and `id` (controller usage) caused unauthorized errors (401).

**Fix:**
Unified all authentication-related logic to consistently use `userId`.

---

## BUG-002: Registration cancellation error

**Issue:**
Prisma query for deleting a registration failed due to incorrect filtering.

**Fix:**
Added proper conditions (`id` + `userId`) in the query to ensure correct record selection.

---

## BUG-003: CI test failures

**Issue:**
Tests failed in CI environment due to missing initial data (no registered user).

**Fix:**
Updated test flow to include user registration before login.

---

## BUG-004: Middleware inconsistency

**Issue:**
Authentication middleware returned incorrect user object structure.

**Fix:**
Standardized middleware to return `{ userId }` and aligned all controllers accordingly.

---

## Conclusion

All identified bugs were fixed and verified through automated testing.
The debugging process significantly improved the robustness of the backend.
