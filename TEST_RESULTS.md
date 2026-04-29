# Test Results

## Overview

All API endpoints were tested using automated integration tests (Jest + Supertest).
Tests were executed both locally and through the CI pipeline.

---

## Summary

| Endpoint                      | Tests | Passed | Failed |
| ----------------------------- | ----- | ------ | ------ |
| POST /api/users/register      | 1     | 1      | 0      |
| POST /api/users/login         | 1     | 1      | 0      |
| GET /api/users/me             | 1     | 1      | 0      |
| POST /api/events              | 1     | 1      | 0      |
| GET /api/events               | 1     | 1      | 0      |
| GET /api/events/:id           | 1     | 1      | 0      |
| POST /api/registrations       | 1     | 1      | 0      |
| GET /api/registrations/me     | 1     | 1      | 0      |
| DELETE /api/registrations/:id | 1     | 1      | 0      |

---

## Results

* Total tests run: **10**
* Passing: **10**
* Failing: **0**

All endpoints are functioning correctly and meet the expected behavior.

---

## Testing Approach

* Integration testing using **Jest + Supertest**
* Tests simulate real API requests
* Authentication is included in protected endpoints
* Edge cases such as duplicate registrations are tested

---

## Conclusion

The backend system passed all tests successfully.
The automated tests ensure reliability and prevent regressions during development.
